<a href="https://www.producthunt.com/p/airespaker-ai-response-taker" target="_blank" rel="noopener noreferrer"><img alt="[airespaker] AI Response Taker - Notes keeper for AI responses | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1198843&amp;theme=light&amp;t=1784279627210"></a>

```
=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _| |_____ _ _ 
 / _` | | | '_/ -_|_-< '_ \ / _` | / / -_) '_|
 \__,_|_| |_| \___/__/ .__/ \__,_|_\_\___|_|  
=====================|_|=======================
              AI Response Taker
===============================================


---------------------|_|-----------------------
                  Overview
-----------------------------------------------

[airespaker] AI Response Taker is a platform that helps collect
responses from well-known AIs and manage that responses for
retrieval, reference, and storage purposes.

+ Well-known AIs include
  o Google AI Search, Bing Copilot Search, ChatGPT


---------------------|_|-----------------------
                  Demo Site
-----------------------------------------------

+ URL: https://airespaker.is-best.net

```
+ Live: [[airespaker] AI Response Taker](https://airespaker.is-best.net)

```


---------------------|_|-----------------------
                  Tech Stack
-----------------------------------------------

+ Front-end:
  o VueJS 3 on PHP-based site which is hosted on InfinityFree.com

+ Bridge:
  o HTTP tunnel which is hosted on Pinggy.io

+ Back-end:
  o Pure PHP site which is hosted on Smartphone placed on Wi-Fi network
  o Database which is on MariaDB and is published only API procedures & functions


---------------------|_|-----------------------
                  Features
-----------------------------------------------

+ Add AI responses

+ Delete AI responses

+ Copy AI response to clipboard

+ Insert AI responses from either system's cache or user's cache by AI query
 
+ Filter & display AI responses:
  o By Reponse Code
  o By AI Query
  o By AI
  o By Tag


---------------------|_|-----------------------
            Challenges & Solutions
-----------------------------------------------

1. Publish back-end on smartphone placed on Wi-Fi network using Pinggy.io Free account

+ Pinggy.io provides service for making HTTP tunnel to public website which
is hosted on local network. Free account requires confirmation screen for first
time accessing website. HTTP tunnel is available only in 1 hour.

== Solution (on boarding) ==>
  o Use VueJS 3 to make one page application, checking HTTP tunnel's availability for
    each 5 seconds
  o Send 'X-Pinggy-No-Screen' header

== Solution (on production) ==>
  o Use Premium account of Pinggy.io


```
