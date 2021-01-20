#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets
import pyautogui
import socket

from http.server import SimpleHTTPRequestHandler, HTTPServer

def KeyPress(message):
    if (message=='space'):
        pyautogui.press('')
    if (message=='delete'):
        pyautogui.press('backspace')
    if (message=='period'):
    	pyautogui.press('.')  
    if (message=='comma'):
    	pyautogui.press(',')
    if (message=='quote'):
    	pyautogui.press('"')   
    if (message=='semicolon'):
    	pyautogui.press(';') 
    if (message=='question'):
    	pyautogui.press('?') 
    if (message=='leftshift'):
    	pyautogui.press('capslock') 	   
    else:
        pyautogui.press(message)


async def time(websocket, path):
    while True:      
        message = await websocket.recv()
        KeyPress(message)
        print(message)


server_address = ('', 8000)                                                                                                                                                                    

start_server = websockets.serve(time, socket.gethostbyname(socket.gethostname()), 5678)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever() 
   

