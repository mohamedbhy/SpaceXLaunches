//
//  ImageToGradient.swift
//  SpaceXLaunches
//
//  Created by mohamed bel haj youssef on 1/18/19.
//  Copyright © 2019 Facebook. All rights reserved.
//


import Foundation
import UIKit
class Gradient{
  var steps:Int
  var angle:Float
  var red:[UInt16];
  var green:[UInt16];
  var blue:[UInt16];
  var alpha:[UInt16];
  var unit:[UInt16];
  init(steps:Int,angle:Float){
    self.steps = steps
    self.angle = angle
    self.red = Array<UInt16>()
    self.green = Array<UInt16>()
    self.blue = Array<UInt16>()
    self.alpha = Array<UInt16>()
    self.unit = Array<UInt16>()
    for _ in 0..<steps{
      self.red.append(0)
      self.green.append(0)
      self.blue.append(0)
      self.alpha.append(0)
      self.unit.append(0)
    }
  }
}
func addToGradient(gradient:Gradient,index:Int,red:UInt8,green:UInt8,blue:UInt8,alpha:UInt8,weight:UInt8)->Void{
  gradient.red[index] = gradient.red[index] + UInt16(red);
  gradient.green[index] = gradient.green[index] + UInt16(green);
  gradient.blue[index] = gradient.blue[index] + UInt16(blue);
  gradient.alpha[index] = gradient.alpha[index] + UInt16(alpha);
  gradient.unit[index] = gradient.unit[index] + UInt16(weight);
}
func fmod(a:Float,b:Float)->Float{return ((a - (floor(a / b) * b)))}
@objc(ImageToGradient)
class ImageToGradient:NSObject{
  @objc func toGradient(_ src:NSString,steps:NSInteger,angle:Float,callback:RCTResponseSenderBlock)->Void{
    let url = URL(string: String(src))
    let data = try? Data(contentsOf: url!)
    guard (url != nil)&&(data != nil) else {
      return callback(["err",NSNull.self])
    }
    let _image = UIImage(data: data!)
    let image = RGBAImage(image:_image!)
    let blockWidth = (image?.width)!/steps
    let blockHeight = (image?.height)!/steps
    var startX = 0
    var startY = 0
    var sumR:UInt64 = 0
    var sumG:UInt64 = 0
    var sumB:UInt64 = 0
    var sumA:UInt64 = 0
    var newMatrix : [[[UInt8]]] = Array()
    for w in 0..<steps{
      newMatrix.append(Array())
      for k in 0..<steps{
        newMatrix[w].append(Array())
        for i in startY..<blockHeight+(k*blockHeight){
          for j in startX..<blockWidth+(w*blockWidth){
            sumR = sumR+UInt64((image?.pixel(x: j, i)?.R)!)
            sumG = sumG+UInt64((image?.pixel(x: j, i)?.G)!)
            sumB = sumB+UInt64((image?.pixel(x: j, i)?.B)!)
            sumA = sumA+UInt64((image?.pixel(x:j,i)?.A)!)
          }
        }
        newMatrix[w][k].append(UInt8(sumR/UInt64((blockWidth*blockHeight))))
        newMatrix[w][k].append(UInt8(sumG/UInt64((blockWidth*blockHeight))))
        newMatrix[w][k].append(UInt8(sumB/UInt64((blockWidth*blockHeight))))
        newMatrix[w][k].append(UInt8(sumA/UInt64((blockWidth*blockHeight))))
        sumR = 0
        sumG = 0
        sumB = 0
        sumA = 0
        startY += blockHeight
      }
      startX += blockWidth
      startY = 0
    }
    let gradient = Gradient(steps: steps, angle: Float(angle))
    let coss = cos(angle/180.0*Float.pi)
    let sinn = sin(angle/180.0*Float.pi)
    let hsteps = Float(steps)*0.5
    var weight:Float
    var red,green,blue,alpha:UInt8
    var res:[String] = Array()
    for i in 0..<steps{
      for j in 0..<steps{
        for k in 0..<gradient.steps{
          var temp:Float = sinn * Float(i) + coss * Float(j) - Float(k)
          temp += Float(hsteps)
          weight = fmod(temp, Float(steps))
          weight -= hsteps
          weight = 1.0 - abs(weight)
          guard (weight >= 0) else {continue}
          red = newMatrix[i][j][0]
          green = newMatrix[i][j][1]
          blue = newMatrix[i][j][2]
          alpha = newMatrix[i][j][3]
          addToGradient(gradient: gradient, index: k, red: red*UInt8(weight), green: green*UInt8(weight), blue: blue*UInt8(weight), alpha: alpha*UInt8(weight), weight: UInt8(weight))
        }
      }
    }
    for i in 0..<steps{
      gradient.red[i] /= gradient.unit[i];
      gradient.green[i] /= gradient.unit[i];
      gradient.blue[i] /= gradient.unit[i];
      gradient.alpha[i] /= gradient.unit[i];
      gradient.unit[i] = 1;
      res.append("rgba(\(gradient.red[i]),\(gradient.green[i]),\(gradient.blue[i]),\(String(format:"%.1f",gradient.alpha[i]/255)))")
    }
    return callback([NSNull.self, res as NSArray])
  }
}
