/* ============================================================
   CYBERSECURITY 3D HOLOGRAPHIC GLOBE MOTIF
   High-performance Canvas 2D vector globe with pulse-traced continents,
   atmospheric HUD telemetry, and stealth contrast calibration.
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('cyber-bg');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Packed continent boundary coordinates [lon, lat, lon, lat, ...]
  // Sourced from Natural Earth 110m landmasses, simplified for zero-latency 60fps render
  const CONTINENTS = [[107.0,77.0,111.1,76.7,114.1,75.8,110.2,74.5,113.0,74.0,118.8,73.6,123.2,73.0,127.0,73.6,129.7,71.2,132.3,71.8,135.6,71.7,138.2,71.6,149.5,72.2,153.0,70.8,157.0,71.0,159.8,70.5,164.1,69.7,167.8,69.6,170.8,69.0,173.6,69.8,178.6,69.4,180.0,65.0,177.4,64.6,179.5,62.6,174.6,61.8,170.7,60.3,166.3,59.8,163.5,59.9,163.1,56.2,160.4,54.3,158.2,51.9,155.4,55.4,156.8,57.8,160.2,59.3,163.7,61.1,160.1,60.5,156.7,61.4,154.2,59.8,151.3,58.8,148.5,59.2,145.5,59.3,142.2,59.0,139.0,57.1,135.1,54.7,138.2,53.8,141.3,53.1,140.5,50.0,138.6,47.0,135.5,44.0,132.9,42.8,130.0,41.9,128.0,40.0,129.2,37.4,128.2,34.9,126.1,36.7,125.4,39.4,122.1,39.2,119.0,39.3,121.7,37.5,119.7,35.6,121.2,32.5,122.1,29.8,120.4,27.1,118.7,24.5,115.9,22.8,113.2,22.1,110.4,20.3,108.1,21.6,105.9,19.8,107.4,16.7,109.3,13.4,108.4,11.0,105.2,8.6,103.5,10.6,101.7,12.6,99.5,10.8,100.3,8.3,102.1,6.2,103.3,3.7,100.7,3.9,99.7,6.8,98.6,9.9,98.5,13.1,97.6,16.1,94.8,15.8,93.5,19.4,92.0,21.7,89.4,22.0,87.0,20.7,83.9,18.3,81.7,16.3,80.2,13.8,79.9,10.4,77.9,8.3,76.1,10.3,74.9,12.7,73.5,16.0,72.8,19.2,70.5,20.9,68.2,23.7,64.5,25.2,61.5,25.1,58.5,25.6,55.7,27.0,52.5,27.6,50.1,30.1,48.8,27.7,50.5,25.3,53.4,24.2,56.1,26.1,58.1,23.7,58.9,21.1,57.2,18.9,55.3,17.2,52.4,16.4,49.6,14.7,46.7,13.4,44.2,12.6,42.6,15.2,41.8,17.8,40.2,20.2,39.1,22.6,37.2,24.9,35.6,27.4,33.1,28.4,34.5,25.6,35.5,23.1,37.2,21.0,37.9,18.4,39.3,15.9,41.7,13.9,43.1,11.5,46.6,10.8,49.3,11.4,50.1,8.1,48.6,5.3,46.6,2.9,44.1,1.1,42.0,-0.9,40.1,-3.3,38.7,-5.9,39.2,-8.5,40.5,-10.8,40.6,-14.2,39.5,-16.7,36.3,-18.7,35.2,-21.3,35.5,-24.1,33.0,-25.4,32.5,-28.3,30.6,-30.4,28.2,-32.8,25.8,-33.9,23.0,-33.9,20.1,-34.8,17.9,-32.6,17.1,-29.9,15.2,-27.1,14.4,-23.9,13.4,-20.9,11.8,-18.1,12.1,-14.9,13.3,-12.5,13.1,-9.8,12.7,-6.9,11.1,-4.0,8.8,-1.1,9.6,2.3,8.5,4.8,5.9,4.3,3.6,6.3,-0.5,5.3,-3.3,5.0,-6.5,4.7,-9.9,5.6,-12.4,7.3,-14.1,9.9,-16.3,11.8,-17.1,14.4,-16.3,17.2,-16.3,20.1,-16.3,23.0,-14.8,25.6,-13.1,27.6,-10.4,29.1,-9.4,32.0,-6.9,34.1,-4.6,35.3,-1.2,35.7,1.5,36.6,4.8,36.9,7.7,36.9,11.0,37.1,10.1,34.3,12.7,32.8,15.2,32.3,18.0,30.8,20.9,32.7,23.6,32.2,26.5,31.6,29.7,31.2,33.0,31.0,35.0,32.8,35.9,35.4,32.5,36.1,29.7,36.1,27.0,37.7,27.3,40.4,31.1,41.1,35.2,42.0,38.3,40.9,41.6,41.5,38.7,44.3,39.1,47.0,35.8,46.6,33.9,44.4,31.7,46.3,29.1,44.8,27.7,42.6,26.4,40.2,23.7,40.7,24.0,37.7,21.3,37.6,20.0,39.9,18.9,42.3,16.0,43.5,13.7,45.1,15.1,42.0,17.5,40.9,16.1,38.0,14.7,40.6,12.1,41.7,10.2,43.9,7.4,43.7,4.6,43.4,2.1,41.2,-0.3,39.3,-2.1,36.7,-5.0,36.3,-7.9,36.8,-9.4,39.4,-9.0,42.6,-5.4,43.6,-1.9,43.4,-1.2,46.0,-4.5,48.0,-1.6,48.6,1.3,50.1,3.8,51.6,6.1,53.5,8.8,54.0,8.1,56.5,10.6,57.7,9.9,55.0,12.5,54.5,16.4,54.5,19.7,54.4,21.1,56.8,24.1,57.0,25.9,59.6,29.1,60.0,26.3,60.4,22.9,59.8,21.1,62.6,24.7,64.9,22.2,65.7,19.8,63.6,17.1,61.3,16.8,58.7,15.9,56.1,12.9,55.4,11.0,58.9,8.4,58.3,5.7,58.6,5.0,62.0,8.6,63.5,12.4,65.9,14.8,67.8,19.2,69.8,23.0,70.2,26.4,71.0,31.3,70.5,33.8,69.3,36.5,69.1,40.3,67.9,38.4,66.0,33.9,66.8,36.2,64.1,39.6,64.5,42.1,66.5,46.3,68.3,50.2,68.0,53.7,68.9,57.3,68.5,59.9,68.3,63.5,69.5,68.5,68.1,66.7,70.7,69.2,72.8,72.6,72.8,72.6,69.0,71.3,66.3,73.9,66.8,73.6,69.6,74.9,72.1,77.6,72.3,81.5,71.8,84.7,73.8,87.2,75.1,90.3,75.6,92.9,75.8,95.9,76.1,98.9,76.4,102.0,77.3,106.1,77.4],[-90.5,69.5,-88.0,68.6,-85.5,69.9,-82.6,69.7,-81.4,67.1,-84.7,66.3,-87.3,64.8,-89.9,64.0,-93.2,62.0,-94.7,58.9,-92.3,57.1,-89.0,56.9,-86.1,55.7,-83.4,55.2,-81.4,52.2,-78.6,52.6,-78.2,55.1,-76.6,57.2,-77.3,59.9,-77.4,62.6,-74.7,62.2,-71.7,61.5,-69.3,59.0,-66.2,58.8,-62.5,58.2,-60.5,55.8,-58.0,54.9,-55.8,53.3,-58.8,51.1,-61.7,50.1,-65.4,50.3,-68.5,49.1,-71.1,46.8,-68.7,48.3,-65.1,49.2,-64.5,46.2,-61.5,45.9,-64.2,44.3,-67.1,45.1,-70.1,43.7,-71.9,41.3,-74.2,39.7,-75.9,37.2,-77.4,34.5,-80.3,32.5,-81.3,30.0,-80.1,26.9,-82.7,27.5,-83.7,29.9,-86.4,30.4,-89.2,30.3,-92.5,29.6,-95.6,28.7,-97.4,26.7,-97.8,22.9,-96.5,19.9,-94.4,18.1,-91.4,18.9,-89.6,21.3,-86.8,21.3,-87.8,18.3,-88.9,15.9,-86.1,15.9,-83.4,15.3,-83.5,12.4,-82.5,9.6,-79.9,9.3,-77.4,8.7,-75.5,10.6,-72.6,11.7,-71.7,9.1,-70.2,11.4,-67.3,10.5,-64.3,10.4,-61.6,9.9,-59.1,8.0,-57.1,6.0,-54.0,5.8,-51.7,4.2,-50.0,1.7,-48.6,-1.2,-44.9,-1.6,-41.5,-2.9,-38.5,-3.7,-35.6,-5.1,-35.1,-9.0,-37.0,-11.0,-39.0,-13.8,-39.2,-17.2,-40.8,-20.9,-43.1,-23.0,-46.5,-24.1,-48.5,-25.9,-48.9,-28.7,-50.7,-31.0,-52.7,-33.2,-54.9,-35.0,-57.8,-34.5,-56.8,-36.9,-59.2,-38.7,-62.3,-38.8,-63.8,-41.2,-65.2,-43.5,-67.3,-45.6,-66.0,-48.1,-68.7,-50.3,-70.8,-52.9,-73.7,-52.8,-75.5,-50.4,-75.2,-47.7,-74.4,-44.1,-73.7,-39.9,-73.6,-37.2,-71.9,-33.9,-71.7,-30.9,-70.9,-27.6,-70.4,-23.6,-70.2,-19.8,-71.5,-17.4,-75.2,-15.3,-77.1,-12.2,-79.0,-8.4,-81.2,-6.1,-80.3,-3.4,-80.4,-0.3,-78.6,1.8,-77.3,4.7,-77.9,7.2,-80.4,8.3,-83.5,8.4,-85.7,9.9,-87.2,12.5,-89.8,13.5,-92.2,14.5,-94.7,16.2,-98.0,16.1,-100.8,17.2,-103.5,18.3,-105.7,20.4,-106.9,23.8,-109.3,25.6,-110.6,27.9,-112.8,30.0,-114.8,31.8,-113.6,29.1,-111.6,26.7,-110.2,24.3,-112.3,26.0,-115.1,27.7,-116.3,30.8,-117.9,33.6,-120.6,34.6,-122.5,37.6,-124.4,40.3,-124.1,43.7,-124.1,46.9,-124.9,50.0,-127.4,50.8,-129.3,53.6,-132.0,55.5,-134.1,58.1,-137.8,58.5,-140.8,59.7,-144.0,60.0,-147.1,60.9,-149.7,59.7,-152.6,60.1,-155.3,57.7,-158.1,56.5,-161.2,55.4,-164.8,54.4,-161.8,55.9,-158.7,57.0,-160.4,59.1,-163.8,59.8,-166.1,61.5,-163.8,63.2,-160.8,63.8,-163.5,64.6,-166.4,64.7,-164.5,66.6,-161.7,66.1,-164.4,67.6,-162.9,69.9,-159.0,70.9,-155.1,71.1,-152.2,70.8,-147.6,70.2,-144.9,70.0,-142.1,69.9,-139.1,69.5,-136.5,68.9,-132.9,69.5,-129.8,70.2,-125.8,69.5,-123.1,69.6,-119.9,69.4,-116.2,68.8,-113.5,67.7,-110.8,67.8,-107.8,67.9,-104.3,68.0,-101.5,67.6,-98.4,67.8,-95.5,68.1,-96.4,71.2,-92.9,71.3,-90.5,69.5],[-58.6,-64.2,-61.3,-64.5,-63.7,-66.5,-63.2,-69.2,-61.4,-72.0,-63.3,-74.6,-65.9,-75.6,-68.4,-76.0,-72.2,-76.7,-75.6,-76.7,-77.9,-78.4,-75.4,-80.3,-71.4,-80.7,-68.2,-81.3,-63.3,-81.7,-59.7,-82.4,-57.0,-82.9,-53.6,-82.3,-49.8,-81.7,-44.8,-81.8,-42.2,-81.7,-38.2,-81.3,-34.4,-80.9,-30.1,-80.6,-33.7,-79.5,-31.0,-77.4,-27.5,-76.5,-23.9,-76.2,-21.2,-75.9,-17.5,-75.1,-15.4,-73.1,-12.3,-72.4,-9.1,-71.3,-5.8,-71.0,-3.0,-71.3,-0.2,-71.6,3.0,-71.0,6.3,-70.5,9.5,-70.0,12.4,-70.2,15.1,-70.4,18.2,-69.9,21.5,-70.1,24.8,-70.5,28.1,-70.3,31.0,-69.8,33.9,-68.5,37.2,-69.2,40.0,-69.1,42.9,-68.5,45.7,-67.8,48.3,-67.4,50.9,-66.5,53.6,-65.9,56.4,-66.0,58.7,-67.3,61.4,-68.0,64.1,-67.4,66.9,-67.9,69.7,-69.0,68.4,-71.4,71.0,-72.1,73.3,-70.4,76.6,-69.6,79.1,-68.3,82.1,-67.4,84.7,-67.2,87.5,-66.9,90.6,-67.2,93.5,-67.2,96.7,-67.2,99.7,-67.2,102.8,-65.6,106.2,-66.9,109.2,-66.8,111.7,-66.1,114.4,-66.1,117.4,-66.9,120.9,-67.2,124.1,-66.6,127.0,-66.6,129.7,-66.6,132.9,-66.4,135.7,-65.6,138.6,-66.9,142.1,-66.8,145.5,-66.9,148.8,-68.4,151.5,-68.7,154.3,-68.6,156.8,-69.4,159.7,-70.0,162.7,-70.7,166.1,-70.8,169.5,-71.2,168.0,-73.8,165.0,-75.1,164.3,-77.8,167.0,-78.8,163.7,-79.1,160.9,-79.7,162.5,-82.1,165.1,-82.7,168.9,-83.3,172.3,-84.0,176.0,-84.2,180.0,-84.7,180.0,-90.0,-180.0,-90.0,-180.0,-84.7,-177.3,-84.5,-174.4,-84.5,-170.0,-83.9,-167.0,-84.6,-164.2,-84.8,-158.1,-85.4,-155.2,-85.1,-150.9,-85.3,-145.9,-85.3,-143.1,-85.0,-146.8,-84.5,-150.1,-84.3,-153.6,-83.7,-155.3,-81.4,-152.1,-81.0,-148.9,-81.0,-151.6,-79.3,-155.3,-79.1,-158.1,-78.0,-155.3,-77.2,-151.3,-77.4,-148.7,-76.9,-146.1,-76.5,-142.8,-75.3,-138.9,-75.0,-135.2,-74.3,-132.3,-74.3,-129.6,-74.5,-126.9,-74.4,-124.0,-74.5,-121.1,-74.5,-117.5,-74.0,-113.9,-73.7,-111.3,-74.4,-107.6,-75.2,-104.9,-74.9,-102.0,-75.1,-103.7,-72.6,-100.3,-72.8,-97.7,-73.6,-95.0,-73.5,-92.4,-73.2,-89.2,-72.6,-86.0,-73.1,-82.7,-73.6,-79.3,-73.5,-76.2,-74.0,-72.8,-73.4,-70.2,-73.1,-67.4,-72.5,-68.5,-70.1,-67.7,-67.3,-65.4,-65.9,-63.0,-64.6,-59.9,-64.0,-57.2,-63.5],[-27.1,83.5,-20.8,82.7,-26.5,82.3,-31.9,82.2,-27.9,82.1,-24.8,81.8,-22.1,81.7,-15.8,81.9,-12.8,81.7,-16.3,80.6,-20.0,80.2,-18.5,77.0,-21.7,76.6,-19.4,74.3,-22.2,73.3,-24.8,72.3,-22.1,71.5,-25.5,71.4,-22.3,70.1,-25.0,69.3,-27.7,68.5,-30.7,68.1,-34.2,66.7,-37.0,65.9,-39.8,65.5,-42.8,62.7,-43.4,60.1,-46.3,60.9,-49.2,61.4,-51.6,63.6,-53.7,66.1,-51.5,68.7,-54.7,69.6,-51.4,70.6,-54.0,71.5,-56.1,73.6,-58.6,75.1,-61.3,76.1,-66.1,76.1,-69.7,76.4,-66.8,77.4,-71.0,77.6,-65.7,79.4,-63.7,81.2,-60.3,82.0,-57.2,82.2,-54.1,82.2,-50.4,82.4,-46.6,82.0,-43.4,83.2,-39.9,83.2,-35.1,83.6,-27.1,83.5],[143.6,-13.8,145.5,-16.3,146.4,-19.0,148.8,-20.4,150.5,-22.6,152.9,-25.3,153.6,-28.1,153.1,-30.9,151.3,-33.8,150.1,-36.4,147.4,-38.2,144.5,-38.1,141.6,-38.3,139.6,-36.1,136.8,-35.3,134.6,-33.2,132.3,-32.0,129.5,-31.6,126.1,-32.2,123.7,-33.9,120.6,-33.9,118.0,-35.1,115.0,-34.2,115.7,-31.6,114.6,-28.8,113.3,-26.1,113.8,-23.1,115.9,-21.1,118.8,-20.3,121.4,-19.2,123.0,-16.4,125.2,-14.7,127.8,-14.3,130.3,-13.4,132.6,-11.6,135.3,-12.2,135.5,-15.0,138.3,-16.8,140.9,-17.4,141.6,-14.6,141.9,-11.9],[-86.6,73.2,-82.3,73.8,-78.8,72.4,-75.6,72.2,-72.2,71.6,-68.8,70.5,-66.4,68.1,-63.4,66.9,-66.7,66.4,-64.7,63.4,-68.8,63.7,-66.3,62.3,-71.0,62.9,-73.4,64.2,-77.7,64.2,-74.0,65.5,-73.3,68.1,-76.9,68.9,-79.5,69.9,-84.9,70.0,-88.7,70.4,-89.4,73.1,-85.8,73.8],[-68.5,83.1,-65.8,83.0,-61.9,82.6,-66.8,81.7,-69.5,80.6,-73.2,79.6,-76.9,79.3,-79.8,77.2,-83.2,76.5,-86.1,76.3,-89.5,76.5,-85.0,77.5,-88.0,78.4,-85.4,79.0,-81.8,80.5,-87.6,80.5,-90.2,81.3,-87.0,82.3,-84.3,82.6,-81.1,83.0,-76.2,83.2,-72.8,83.2,-68.5,83.1],[134.1,-1.2,137.4,-1.7,141.0,-2.6,144.6,-3.9,147.6,-6.1,148.7,-9.1,146.0,-8.1,143.3,-8.2,140.1,-8.3,138.4,-6.2,136.0,-4.5,133.4,-4.0,131.8,-1.6],[-114.2,73.1,-111.1,72.5,-108.2,71.7,-105.4,72.7,-102.8,70.5,-106.0,69.2,-109.0,68.8,-112.0,68.6,-115.2,69.3,-112.4,70.4,-116.5,70.5,-119.4,71.6,-115.2,73.3],[141.0,37.1,139.0,34.7,135.8,33.5,133.3,34.4,131.3,31.5,129.4,33.3,131.9,34.7,134.6,35.7,136.7,37.3,139.4,38.2,140.3,41.2,141.0,38.2],[57.5,70.7,53.7,70.8,54.4,73.6,57.9,75.6,61.2,76.3,64.5,76.4,68.2,76.9,64.6,75.7,61.6,75.3,58.5,74.3,55.4,72.4,57.5,70.7],[50.1,-13.6,49.9,-16.5,49.0,-19.1,47.9,-22.4,47.1,-24.9,44.0,-25.0,43.3,-22.1,44.5,-19.4,44.4,-16.2,46.9,-15.2,48.8,-13.1],[105.8,-5.9,102.6,-4.2,100.9,-2.1,99.3,0.2,97.7,2.5,95.4,5.0,98.4,4.3,100.6,2.1,103.1,0.6,104.5,-1.8,105.9,-4.3],[117.9,1.8,117.5,-0.8,116.1,-4.0,113.3,-3.1,110.2,-2.9,109.1,-0.5,111.2,1.9,113.7,3.9,116.2,6.1,119.2,5.4,117.3,3.2],[-94.7,77.1,-91.6,76.8,-89.2,75.6,-86.4,75.5,-82.8,75.8,-80.1,75.3,-83.2,74.6,-86.1,74.4,-89.8,74.5,-92.4,74.8,-96.0,76.4],[49.1,41.3,48.9,38.3,52.3,36.7,53.9,39.0,54.0,41.6,51.3,43.1,53.0,45.3,50.0,46.6,46.7,44.6,48.6,41.8],[125.2,1.4,122.7,0.4,120.0,-0.5,123.3,-0.6,122.5,-3.2,120.4,-5.5,118.8,-2.8,119.8,0.2,122.9,0.9],[-3.0,58.6,-3.1,56.0,-0.4,54.5,1.7,52.7,-0.8,50.8,-3.6,50.2,-4.8,52.8,-4.7,55.5,-5.0,58.6],[-45.2,-78.0,-43.3,-80.0,-46.5,-80.6,-50.5,-81.0,-54.2,-80.6,-51.0,-79.6,-48.7,-78.0,-45.2,-78.0],[18.3,79.7,21.5,79.0,18.5,77.8,15.9,76.8,13.2,78.0,10.4,79.7,13.2,80.0,17.0,80.1],[-67.8,-53.9,-65.0,-54.7,-68.1,-55.6,-71.0,-55.1,-74.7,-52.8,-71.1,-54.1,-68.6,-52.6],[-79.7,22.8,-77.1,21.7,-74.2,20.3,-77.8,19.9,-80.2,21.8,-82.8,22.7,-79.7,22.8],[-175.0,66.6,-171.9,66.9,-173.0,64.3,-176.0,64.9,-178.9,65.7,-180.0,69.0,-174.9,67.2],[-120.5,71.4,-123.1,70.9,-125.9,71.9,-123.9,73.7,-120.1,74.2,-116.6,73.9,-119.2,72.5],[-108.2,76.2,-105.7,75.5,-109.7,74.8,-113.7,74.4,-116.3,75.0,-112.6,76.1,-109.1,75.5],[173.0,-40.9,173.1,-43.9,170.6,-45.9,167.8,-46.3,168.9,-43.9,171.6,-41.8],[174.6,-36.2,176.8,-37.9,176.5,-40.6,173.8,-39.5,174.3,-36.7,172.6,-34.5],[108.6,-6.8,112.6,-6.9,115.7,-8.4,112.6,-8.4,109.4,-7.7,106.5,-7.4],[-56.1,50.7,-53.5,49.2,-53.1,46.7,-56.0,46.9,-59.3,47.6,-57.4,50.7],[-14.5,66.5,-17.8,63.7,-22.8,64.0,-20.6,65.7,-17.8,66.0,-14.5,66.5],[25.4,80.4,23.0,79.4,20.1,79.6,17.4,80.3,20.5,80.6,25.4,80.4],[-87.0,79.7,-90.8,78.2,-94.0,78.8,-96.7,80.2,-92.4,81.3,-89.5,80.5]];

  // Global cybersecurity telemetry hubs (lat, lon, code, name)
  const CYBER_HUBS = [
    { lat: 37.77, lon: -122.42, code: 'SFO', name: 'NODE // SFO' },
    { lat: 40.71, lon: -74.01, code: 'NYC', name: 'NODE // NYC' },
    { lat: 51.51, lon: -0.13, code: 'LDN', name: 'SEC_GW // LDN' },
    { lat: 50.11, lon: 8.68, code: 'FRA', name: 'IXP // FRA' },
    { lat: 35.68, lon: 139.77, code: 'TYO', name: 'CYBER // TYO' },
    { lat: 1.35, lon: 103.82, code: 'SIN', name: 'APAC // SIN' },
    { lat: -33.87, lon: 151.21, code: 'PAC // SYD' },
    { lat: -23.55, lon: -46.63, code: 'SAO', name: 'LATAM // SAO' },
    { lat: -33.92, lon: 18.42, code: 'CPT', name: 'AFR // CPT' },
    { lat: -1.29, lon: 36.82, code: 'NBO', name: 'GRID // NBO' }
  ];

  // Cyber telemetry data connections (great-circle arcs)
  const HUB_LINKS = [
    [0, 4], // SFO - TYO (Trans-Pacific)
    [0, 1], // SFO - NYC (Trans-Continental)
    [1, 2], // NYC - LDN (Trans-Atlantic)
    [2, 3], // LDN - FRA (Euro Backbone)
    [3, 4], // FRA - TYO (Eurasian Link)
    [4, 5], // TYO - SIN (Asia-Pacific)
    [5, 6], // SIN - SYD (Oceania Route)
    [1, 7], // NYC - SAO (Pan-American)
    [2, 8], // LDN - CPT (Euro-Africa)
    [8, 9]  // CPT - NBO (Sub-Saharan Grid)
  ];

  // Canvas & layout state
  let width = 0;
  let height = 0;
  let dpr = 1;
  let cx = 0;
  let cy = 0;
  let R = 380;
  let animId = null;

  // Rotation & tilt physics
  let rot = 0.6; // starting longitude rotation
  const ROT_SPEED = prefersReducedMotion ? 0 : 0.00018; // rad / ms (~58s per revolution)
  const AXIAL_TILT = 0.38; // ~21.8 deg axial tilt

  let mouse = { x: -1000, y: -1000, targetTiltX: 0, targetTiltY: 0, active: false };
  let curTiltX = 0;
  let curTiltY = 0;

  // Pulse wave & sweep timing
  const PULSE_PERIOD = 5600; // ms per pulse cycle (regular pulses)
  const SWEEP_DURATION = 3200; // ms active sweep across globe
  const DECAY_WIDTH = 220; // px phosphor decay tail behind wavefront

  // Dynamic telemetry objects
  let pings = [];
  let packets = [];
  let satAngle = 0;

  // Ambient floating background nodes
  let ambientNodes = [];
  let ambientPulses = [];

  function initAmbientNodes() {
    ambientNodes = [];
    ambientPulses = [];
    // Balanced, unobtrusive density: ~1 node per 40,000 sq px, bounded between 18 and 32
    const count = Math.min(32, Math.max(18, Math.floor((width * height) / 40000)));
    for (let i = 0; i < count; i++) {
      ambientNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.0 + 1.1,
        baseAlpha: Math.random() * 0.10 + 0.08,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  // Graticule geometry caches
  const parallels = [-60, -40, -20, 0, 20, 40, 60];
  const meridians = [];
  for (let m = -180; m < 180; m += 30) meridians.push(m);

  // Resize handler with responsive radius and focal placement
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Responsive globe sizing: expansive yet delicate
    if (width >= 1200) {
      R = Math.max(340, Math.min(490, Math.min(width * 0.36, height * 0.54)));
      cx = Math.round(width * 0.52);
      cy = Math.round(Math.min(height * 0.48, R + 80));
    } else if (width >= 768) {
      R = Math.max(260, Math.min(400, Math.min(width * 0.40, height * 0.48)));
      cx = Math.round(width * 0.50);
      cy = Math.round(Math.min(height * 0.46, R + 70));
    } else {
      R = Math.max(170, Math.min(270, Math.min(width * 0.44, height * 0.38)));
      cx = Math.round(width * 0.50);
      cy = Math.round(height * 0.42);
    }

    initAmbientNodes();
  }

  // 3D Spherical Projection with axial tilt & mouse parallax
  function project(lonDeg, latDeg, rotLng, tiltX, tiltY) {
    const radLat = latDeg * (Math.PI / 180);
    const radLon = (lonDeg * (Math.PI / 180)) + rotLng;

    const cosLat = Math.cos(radLat);
    const sinLat = Math.sin(radLat);
    const x0 = cosLat * Math.sin(radLon);
    const y0 = -sinLat;
    const z0 = cosLat * Math.cos(radLon);

    // Axial tilt around X axis
    const cosTx = Math.cos(AXIAL_TILT + tiltY);
    const sinTx = Math.sin(AXIAL_TILT + tiltY);
    const y1 = y0 * cosTx - z0 * sinTx;
    const z1 = y0 * sinTx + z0 * cosTx;

    // Mouse parallax around Y axis
    const cosTy = Math.cos(tiltX);
    const sinTy = Math.sin(tiltX);
    const x2 = x0 * cosTy + z1 * sinTy;
    const z2 = -x0 * sinTy + z1 * cosTy;
    const y2 = y1;

    return {
      x: cx + x2 * R,
      y: cy + y2 * R,
      z: z2,
      nx: x2,
      ny: y2
    };
  }

  // Exact Horizon horizon-circle clipping for 3D sphere
  function clipHorizon(pFront, pBack) {
    const t = pFront.z / (pFront.z - pBack.z);
    let xh = pFront.nx + t * (pBack.nx - pFront.nx);
    let yh = pFront.ny + t * (pBack.ny - pFront.ny);
    const len = Math.hypot(xh, yh);
    if (len > 0.0001) {
      xh /= len;
      yh /= len;
    }
    return {
      x: cx + xh * R,
      y: cy + yh * R
    };
  }

  // Mouse interaction for responsive parallax tilt
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetTiltX = ((e.clientX - width / 2) / (width / 2)) * 0.09;
      mouse.targetTiltY = ((e.clientY - height / 2) / (height / 2)) * 0.07;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', function () {
      mouse.targetTiltX = 0;
      mouse.targetTiltY = 0;
      mouse.active = false;
    });
  }

  // Spawn a data packet traveling between two hubs
  function maybeSpawnPacket() {
    if (packets.length >= 3 || prefersReducedMotion) return;
    const link = HUB_LINKS[Math.floor(Math.random() * HUB_LINKS.length)];
    packets.push({
      fromHub: link[0],
      toHub: link[1],
      t: 0,
      speed: 0.008 + Math.random() * 0.005,
      size: 1.8
    });
  }

  let packetTimer = setInterval(maybeSpawnPacket, 2400);

  // Occasional data packet traveling between ambient nodes
  function maybeTriggerAmbientPulse() {
    if (ambientNodes.length < 2 || ambientPulses.length >= 2 || prefersReducedMotion) return;
    const fromIdx = Math.floor(Math.random() * ambientNodes.length);
    const fromNode = ambientNodes[fromIdx];
    const neighbors = [];
    for (let i = 0; i < ambientNodes.length; i++) {
      if (i === fromIdx) continue;
      if (Math.hypot(ambientNodes[i].x - fromNode.x, ambientNodes[i].y - fromNode.y) < 135) {
        neighbors.push(ambientNodes[i]);
      }
    }
    if (neighbors.length > 0) {
      const toNode = neighbors[Math.floor(Math.random() * neighbors.length)];
      ambientPulses.push({
        fromX: fromNode.x,
        fromY: fromNode.y,
        toX: toNode.x,
        toY: toNode.y,
        progress: 0,
        speed: 0.007 + Math.random() * 0.004
      });
    }
  }

  let ambientPulseTimer = setInterval(maybeTriggerAmbientPulse, 3200);

  let lastTime = 0;

  // Main Render Loop
  function draw(time) {
    if (!lastTime) lastTime = time;
    const dt = Math.min(time - lastTime, 100);
    lastTime = time;

    // Advance rotation & tilt
    if (!prefersReducedMotion) {
      rot += ROT_SPEED * dt;
      satAngle += 0.0004 * dt;
      curTiltX += (mouse.targetTiltX - curTiltX) * 0.05;
      curTiltY += (mouse.targetTiltY - curTiltY) * 0.05;
    }

    ctx.clearRect(0, 0, width, height);

    // --- LAYER 0: Subtle Ambient Background Floating Nodes ---
    ctx.save();
    const maxConnDist = 135;
    for (let i = 0; i < ambientNodes.length; i++) {
      const n = ambientNodes[i];

      if (!prefersReducedMotion) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -15) n.x = width + 15;
        else if (n.x > width + 15) n.x = -15;
        if (n.y < -15) n.y = height + 15;
        else if (n.y > height + 15) n.y = -15;
      }

      const breathing = Math.sin(time * 0.001 + n.pulseOffset) * 0.035;
      const alpha = Math.max(0.05, Math.min(0.24, n.baseAlpha + breathing));

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(52, 211, 153, ' + alpha + ')';
      ctx.fill();

      // Interconnecting hairlines between nearby ambient nodes
      for (let j = i + 1; j < ambientNodes.length; j++) {
        const n2 = ambientNodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < maxConnDist) {
          const lineAlpha = (1 - dist / maxConnDist) * 0.06;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = 'rgba(16, 185, 129, ' + lineAlpha + ')';
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }

      // Gentle interactive mouse tethering
      if (mouse.active) {
        const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (mDist < 120) {
          const mAlpha = (1 - mDist / 120) * 0.09;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(52, 211, 153, ' + mAlpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Ambient floating pulses
    for (let ap = ambientPulses.length - 1; ap >= 0; ap--) {
      const p = ambientPulses[ap];
      if (!prefersReducedMotion) p.progress += p.speed;
      if (p.progress >= 1) {
        ambientPulses.splice(ap, 1);
        continue;
      }
      const px = p.fromX + (p.toX - p.fromX) * p.progress;
      const py = p.fromY + (p.toY - p.fromY) * p.progress;
      const fade = Math.sin(p.progress * Math.PI);
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(52, 211, 153, ' + (0.45 * fade) + ')';
      ctx.shadowColor = 'rgba(16, 185, 129, 0.7)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Pulse sweep calculations
    const cycleTime = time % PULSE_PERIOD;
    const sweepActive = cycleTime < SWEEP_DURATION;
    const sweepProgress = sweepActive ? (cycleTime / SWEEP_DURATION) : 1.0;

    // Scan wavefront X coordinate across the globe (West to East)
    const scanX = cx - R * 1.15 + sweepProgress * (R * 2.3);

    // --- LAYER 1: Ambient Horizon Halo & Atmospheric Depth ---
    ctx.save();
    const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.05);
    haloGrad.addColorStop(0, 'rgba(16, 185, 129, 0.0)');
    haloGrad.addColorStop(0.85, 'rgba(16, 185, 129, 0.02)');
    haloGrad.addColorStop(1, 'rgba(52, 211, 153, 0.05)');

    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = haloGrad;
    ctx.fill();

    // Sphere perimeter hairline
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)';
    ctx.lineWidth = 1.0;
    ctx.stroke();
    ctx.restore();

    // --- LAYER 2: Outer Telemetry Orbital Rings & Cyber Satellite ---
    ctx.save();
    // Inner dashed orbit
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
    ctx.setLineDash([2, 9]);
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.setLineDash([]);

    // Outer compass tick ring
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.16, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.035)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Radar tick marks at cardinal angles
    for (let deg = 0; deg < 360; deg += 30) {
      const rad = deg * (Math.PI / 180);
      const isMajor = deg % 90 === 0;
      const r1 = R * 1.15;
      const r2 = R * (isMajor ? 1.19 : 1.17);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
      ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
      ctx.strokeStyle = isMajor ? 'rgba(52, 211, 153, 0.14)' : 'rgba(16, 185, 129, 0.06)';
      ctx.lineWidth = isMajor ? 0.9 : 0.5;
      ctx.stroke();
    }

    // Orbiting cyber satellite node
    const satX = cx + Math.cos(satAngle) * (R * 1.08);
    const satY = cy + Math.sin(satAngle) * (R * 1.08);
    ctx.beginPath();
    ctx.arc(satX, satY, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(52, 211, 153, 0.7)';
    ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();

    // --- LAYER 3: Graticule (Parallels & Meridians) ---
    // Back hemisphere graticule (ultra faint ghost wireframe)
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.018)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([1, 6]);

    parallels.forEach(lat => {
      ctx.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 6) {
        const pt = project(lon, lat, rot, curTiltX, curTiltY);
        if (pt.z <= 0) {
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        } else {
          started = false;
        }
      }
      ctx.stroke();
    });
    ctx.restore();

    // Front hemisphere graticule (crisp, subtle wireframe)
    ctx.save();
    parallels.forEach(lat => {
      const isEquator = lat === 0;
      ctx.beginPath();
      ctx.strokeStyle = isEquator ? 'rgba(52, 211, 153, 0.07)' : 'rgba(16, 185, 129, 0.038)';
      ctx.lineWidth = isEquator ? 0.8 : 0.5;
      let started = false;
      for (let lon = -180; lon <= 180; lon += 4) {
        const pt = project(lon, lat, rot, curTiltX, curTiltY);
        if (pt.z > 0) {
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        } else {
          started = false;
        }
      }
      ctx.stroke();
    });

    meridians.forEach(lon => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.035)';
      ctx.lineWidth = 0.5;
      let started = false;
      for (let lat = -80; lat <= 80; lat += 4) {
        const pt = project(lon, lat, rot, curTiltX, curTiltY);
        if (pt.z > 0) {
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        } else {
          started = false;
        }
      }
      ctx.stroke();
    });
    ctx.restore();

    // --- LAYER 4: Continents with Pulse Tracing ---
    // Base resting alpha: 0.065 (stealth, near-invisible while reading)
    // Pulse active alpha: up to 0.45 with vibrant emerald glow
    const baseAlpha = 0.065;
    const tracerSparks = [];

    ctx.save();
    for (let p = 0; p < CONTINENTS.length; p++) {
      const poly = CONTINENTS[p];
      const count = poly.length / 2;
      if (count < 2) continue;

      for (let i = 0; i < count; i++) {
        const nextIdx = (i + 1) % count;
        const lon1 = poly[i * 2];
        const lat1 = poly[i * 2 + 1];
        const lon2 = poly[nextIdx * 2];
        const lat2 = poly[nextIdx * 2 + 1];

        // Skip international date line seam jump
        if (Math.abs(lon1 - lon2) > 180) continue;

        const p1 = project(lon1, lat1, rot, curTiltX, curTiltY);
        const p2 = project(lon2, lat2, rot, curTiltX, curTiltY);

        if (p1.z <= 0 && p2.z <= 0) continue;

        let drawX1 = p1.x, drawY1 = p1.y;
        let drawX2 = p2.x, drawY2 = p2.y;

        // Clip horizon boundaries smoothly
        if (p1.z > 0 && p2.z <= 0) {
          const clipped = clipHorizon(p1, p2);
          drawX2 = clipped.x;
          drawY2 = clipped.y;
        } else if (p1.z <= 0 && p2.z > 0) {
          const clipped = clipHorizon(p2, p1);
          drawX1 = clipped.x;
          drawY1 = clipped.y;
        }

        const midX = (drawX1 + drawX2) * 0.5;
        const midY = (drawY1 + drawY2) * 0.5;
        const distToWave = midX - scanX;

        let segAlpha = baseAlpha;
        let segWidth = 0.75;
        let hasGlow = false;

        // Pulse wavefront intersection & phosphor trace trail
        if (sweepActive && distToWave <= 0 && distToWave >= -DECAY_WIDTH) {
          const intensity = Math.exp(distToWave / 52); // Exponential decay trail
          segAlpha = baseAlpha + 0.38 * intensity;
          segWidth = 0.75 + 0.65 * intensity;

          if (intensity > 0.4) {
            hasGlow = true;
          }

          // Active tracing head: right at the wavefront intersection
          if (Math.abs(distToWave) < 18) {
            const frac = Math.max(0, Math.min(1, 1 - Math.abs(distToWave) / 18));
            tracerSparks.push({
              x: drawX1 + (drawX2 - drawX1) * frac,
              y: drawY1 + (drawY2 - drawY1) * frac,
              intensity: frac
            });
          }
        }

        ctx.beginPath();
        ctx.moveTo(drawX1, drawY1);
        ctx.lineTo(drawX2, drawY2);

        if (hasGlow) {
          ctx.strokeStyle = 'rgba(52, 211, 153, ' + segAlpha + ')';
          ctx.lineWidth = segWidth;
          ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.strokeStyle = 'rgba(16, 185, 129, ' + segAlpha + ')';
          ctx.lineWidth = segWidth;
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Render tracer sparks along actively traced coastline segments
    if (tracerSparks.length > 0) {
      ctx.save();
      for (let s = 0; s < tracerSparks.length; s++) {
        const sp = tracerSparks[s];
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 243, 208, ' + (0.7 * sp.intensity) + ')';
        ctx.shadowColor = 'rgba(52, 211, 153, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();
    }

    // --- LAYER 5: Sweeping Scan Wavefront Beam ---
    if (sweepActive && scanX > cx - R && scanX < cx + R) {
      ctx.save();
      // Clip to sphere circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const beamWidth = 45;
      const grad = ctx.createLinearGradient(scanX - beamWidth, 0, scanX + 4, 0);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.025)');
      grad.addColorStop(0.95, 'rgba(52, 211, 153, 0.08)');
      grad.addColorStop(1, 'rgba(110, 255, 190, 0.18)');

      ctx.fillStyle = grad;
      ctx.fillRect(scanX - beamWidth, cy - R, beamWidth + 4, R * 2);

      // Leading hairline laser sweep
      ctx.beginPath();
      ctx.moveTo(scanX, cy - R);
      ctx.lineTo(scanX, cy + R);
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.22)';
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();
    }

    // --- LAYER 6: Telemetry Data Arcs & Packets ---
    ctx.save();
    HUB_LINKS.forEach(link => {
      const h1 = CYBER_HUBS[link[0]];
      const h2 = CYBER_HUBS[link[1]];
      const p1 = project(h1.lon, h1.lat, rot, curTiltX, curTiltY);
      const p2 = project(h2.lon, h2.lat, rot, curTiltX, curTiltY);

      if (p1.z > 0 && p2.z > 0) {
        // Subtle arched great-circle curve
        const midLon = (h1.lon + h2.lon) * 0.5;
        const midLat = (h1.lat + h2.lat) * 0.5;
        const pMid = project(midLon, midLat, rot, curTiltX, curTiltY);
        const archX = pMid.x + (pMid.x - cx) * 0.08;
        const archY = pMid.y + (pMid.y - cy) * 0.08;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(archX, archY, p2.x, p2.y);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Update & draw data packets traveling along links
    for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
      const pkt = packets[pIdx];
      pkt.t += pkt.speed;
      if (pkt.t >= 1) {
        packets.splice(pIdx, 1);
        continue;
      }

      const h1 = CYBER_HUBS[pkt.fromHub];
      const h2 = CYBER_HUBS[pkt.toHub];
      const p1 = project(h1.lon, h1.lat, rot, curTiltX, curTiltY);
      const p2 = project(h2.lon, h2.lat, rot, curTiltX, curTiltY);

      if (p1.z > 0 && p2.z > 0) {
        const midLon = (h1.lon + h2.lon) * 0.5;
        const midLat = (h1.lat + h2.lat) * 0.5;
        const pMid = project(midLon, midLat, rot, curTiltX, curTiltY);
        const archX = pMid.x + (pMid.x - cx) * 0.08;
        const archY = pMid.y + (pMid.y - cy) * 0.08;

        const invT = 1 - pkt.t;
        const px = invT * invT * p1.x + 2 * invT * pkt.t * archX + pkt.t * pkt.t * p2.x;
        const py = invT * invT * p1.y + 2 * invT * pkt.t * archY + pkt.t * pkt.t * p2.y;
        const fade = Math.sin(pkt.t * Math.PI);

        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, ' + (0.75 * fade) + ')';
        ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    ctx.restore();

    // --- LAYER 7: Global Cybersecurity Telemetry Hubs & Pings ---
    ctx.save();
    CYBER_HUBS.forEach((hub, idx) => {
      const pt = project(hub.lon, hub.lat, rot, curTiltX, curTiltY);
      if (pt.z > 0) {
        // Trigger ping if wavefront passes this hub
        if (sweepActive && Math.abs(pt.x - scanX) < 14) {
          if (!pings.some(p => p.hubIdx === idx && (time - p.startTime < 1500))) {
            pings.push({
              hubIdx: idx,
              startTime: time,
              radius: 2,
              maxRadius: 18,
              alpha: 0.55
            });
          }
        }

        // Hub status dot
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
        ctx.fill();

        // Crosshair tick
        ctx.beginPath();
        ctx.moveTo(pt.x - 3.5, pt.y); ctx.lineTo(pt.x + 3.5, pt.y);
        ctx.moveTo(pt.x, pt.y - 3.5); ctx.lineTo(pt.x, pt.y + 3.5);
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    });

    // Update & draw active ping ripples
    for (let k = pings.length - 1; k >= 0; k--) {
      const ping = pings[k];
      const elapsed = time - ping.startTime;
      const progress = elapsed / 1600;

      if (progress >= 1) {
        pings.splice(k, 1);
        continue;
      }

      // Re-project hub so ping stays locked to rotating globe
      const hub = CYBER_HUBS[ping.hubIdx];
      const curPt = project(hub.lon, hub.lat, rot, curTiltX, curTiltY);
      if (curPt.z <= 0) continue;

      const curRadius = 2 + progress * (ping.maxRadius - 2);
      const curAlpha = ping.alpha * (1 - progress);

      ctx.beginPath();
      ctx.arc(curPt.x, curPt.y, curRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(52, 211, 153, ' + curAlpha + ')';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Micro code badge
      if (progress < 0.6) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(167, 243, 208, ' + (curAlpha * 0.85) + ')';
        ctx.fillText(hub.code, curPt.x + 6, curPt.y - 4);
      }
    }
    ctx.restore();

    // --- LAYER 8: Atmospheric HUD Telemetry Markings ---
    ctx.save();
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
    const hudX = Math.max(24, cx - R - 60);
    const hudY = cy + R * 0.65;
    ctx.fillText('SYS // CYBER_TELEMETRY_01', hudX, hudY);
    ctx.fillText('STATUS: SEC_MESH_NOMINAL', hudX, hudY + 14);
    ctx.fillText('SWEEP FREQ // 5.6s', hudX, hudY + 28);
    ctx.restore();

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(draw);
    }
  }

  // Throttle helper
  function throttle(fn, delay) {
    let last = 0;
    return function () {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

  window.addEventListener('resize', throttle(resize, 120), { passive: true });
  resize();

  if (prefersReducedMotion) {
    draw(0);
  } else {
    animId = requestAnimationFrame(draw);
  }

  // Visibility change handling for power efficiency
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
      clearInterval(packetTimer);
      clearInterval(ambientPulseTimer);
    } else {
      packetTimer = setInterval(maybeSpawnPacket, 2400);
      ambientPulseTimer = setInterval(maybeTriggerAmbientPulse, 3200);
      if (!prefersReducedMotion) {
        lastTime = 0;
        animId = requestAnimationFrame(draw);
      }
    }
  });

})();
