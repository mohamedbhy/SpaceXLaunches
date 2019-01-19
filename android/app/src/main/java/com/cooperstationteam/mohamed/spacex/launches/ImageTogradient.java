package com.cooperstationteam.mohamed.spacex.launches;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class ImageTogradient extends ReactContextBaseJavaModule {
    class Gradient{
        private int[] red,green,blue,alpha,unit;
        private int steps;
        private double angle;
        public Gradient(int steps,double angle){
            this.red = new int[steps];
            this.green = new int[steps];
            this.blue = new int[steps];
            this.alpha = new int[steps];
            this.unit = new int[steps];
            this.steps = steps;
            this.angle = angle;
            for (int i = 0; i < steps; i++) {
                this.red[i] =0;
                this.green[i] = 0;
                this.blue[i] =0;
                this.alpha[i] = 0;
                this.unit[i] = 0;
            }
        }
    }
    public ImageTogradient(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    private double fmod(double a,double b){
        return ((a - (Math.floor(a / b) * b)));
    }
    private void addToGradient(Gradient gradient,int index,double red,double green,double blue,double alpha,double weight){
        gradient.red[index] += red;
        gradient.green[index] += green;
        gradient.blue[index] += blue;
        gradient.alpha[index] += alpha;
        gradient.unit[index] += weight;
    }
    @Override
    public String getName() {
        return "ImageToGradient";
    }
    @ReactMethod
    public void toGradient(final String src,final int steps,final int angle,final Callback callback){
        Runnable task = new Runnable() {
            @Override
            public void run() {
                try{
                    URL url = new URL(src);
                    HttpURLConnection connection = (HttpURLConnection)
                            url.openConnection();
                    connection.setDoInput(true);
                    connection.connect();
                    InputStream input = connection.getInputStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(input);
                    Gradient gradient = new Gradient(steps,angle);
                    int width = bitmap.getWidth();
                    int height = bitmap.getHeight();
                    float scaleWidth = ((float)steps)/width;
                    float scaleHeight = ((float)steps)/height;
                    Matrix matrix = new Matrix();
                    matrix.postScale(scaleWidth,scaleHeight);
                    Bitmap resizedBitmap = Bitmap.createBitmap(bitmap,0,0,width,height,matrix,false);
                    int resizedBitmapWidth = resizedBitmap.getWidth();
                    int resizedBitmapHeight = resizedBitmap.getHeight();
                    double cos = Math.cos(angle/180.0*Math.PI);
                    double sin = Math.sin(angle/180.0*Math.PI);
                    double hsteps = steps*0.5;
                    double weight;
                    ArrayList<String> res = new ArrayList<>();
                    int pixel,red,green,blue,alpha;
                    for (int i = 0; i < resizedBitmapWidth; i++) {
                        for (int j = 0; j < resizedBitmapHeight; j++) {
                            for (int k = 0; k < gradient.steps; k++) {
                                weight = fmod(sin * i + cos * j - k + hsteps, steps) - hsteps;
                                weight = 1.0 - Math.abs(weight);
                                if (weight <= 0) continue;
                                pixel = resizedBitmap.getPixel(i,j);
                                alpha = (pixel & 0xFF000000) >> 24;
                                red = (pixel & 0x00FF0000) >> 16;
                                green = (pixel & 0x0000FF00) >> 8;
                                blue = (pixel & 0x000000FF);
                                addToGradient(gradient,k,red*weight,
                                        green*weight,
                                        blue*weight,alpha,weight);
                            }
                        }
                    }
                    for (int i = 0; i < steps; i++) {
                        gradient.red[i] /= gradient.unit[i];
                        gradient.green[i] /= gradient.unit[i];
                        gradient.blue[i] /= gradient.unit[i];
                        gradient.alpha[i] /= gradient.unit[i];
                        gradient.unit[i] = 1;
                        res.add(i,"rgba("+gradient.red[i]+","+gradient.green[i]+","+gradient.blue[i]+","
                                +new DecimalFormat("#,##").format(gradient.alpha[i]/255)+")");
                    }
                    WritableNativeArray _res = Arguments.makeNativeArray(res);
                    callback.invoke(null,_res);

                }catch (IOException e){
                    callback.invoke(e.getMessage(),null);
                }
            }
        };
        new Thread(task).start();
    }
}
