/**
 * Dangerous MediaPipe workaround!
 *
 */
interface Results {
  poseLandmarks: NormalizedLandmarkList;
  faceLandmarks: NormalizedLandmarkList;
  multiFaceGeometry: FaceGeometry[];
  rightHandLandmarks: NormalizedLandmarkList;
  leftHandLandmarks: NormalizedLandmarkList;
  segmentationMask: GpuBuffer;
  image: GpuBuffer;
  za?: NormalizedLandmarkList;
}
