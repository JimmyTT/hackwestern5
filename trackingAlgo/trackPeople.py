import cv2
import numpy as np
import matplotlib.pyplot as plt
#img = cv2.imread("C:/Users/paava/Desktop/Projects/Hackathons/HackWestern5/rockie.jpg", 1)
img = cv2.imread("./rockie.jpg", 1)
#img_1 = cv2.imread("C:/Users/paava/Desktop/Projects/Hackathons/HackWestern5/rockie.jpg", 0)

#cv2.waitKey()

capture = cv2.VideoCapture(0)
	
frame = capture.grab()
cv2.imshow('Window',frame)
cv2.waitKey()