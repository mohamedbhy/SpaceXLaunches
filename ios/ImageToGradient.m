//
//  ImageToGradient.m
//  SpaceXLaunches
//
//  Created by mohamed bel haj youssef on 1/18/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ImageToGradient, NSObject)
-(dispatch_queue_t)methodQueue{
  return dispatch_queue_create("RNImageToGradient", nil);
}
RCT_EXTERN_METHOD(toGradient:(NSString *)src steps:(NSInteger *)steps  angle:(float *)angle callback:(nonnull RCTResponseSenderBlock *)callback)

@end
