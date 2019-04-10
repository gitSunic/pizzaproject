# -*- coding: utf-8 -*-

from django.shortcuts import render, render_to_response, redirect
from django.urls import reverse
from django.contrib import auth
from django.template.context_processors import csrf
from django.utils.encoding import smart_str
from collections import Counter
import operator, json, datetime

ids = []
ops_check = []
ops_time = []
d = json.load(open('pizza/static/pizza/points.json', encoding="utf8"))
for i in range(0, len(d)):
	ids.append(i)

def index(request):
	out = []
	if not -1 in ids:
		return render(request, 'index.html', {"ids":ids, "check":ops_check, "time":ops_time})
	else:
		return render(request, 'index.html', {"ids":[], "check":ops_check, "time":ops_time})
def attr(request):
	ids.clear()
	if request.POST:
		box = request.POST.getlist("company")
		# return render(request, 'index.html', {"info":box})
		time_str = request.POST.get("time")
		ops_time.clear()
		metro = request.POST.getlist("metro")
		ops_check.clear()
		ops_time.append(time_str)
		for i in range(0,len(d)):
			out = True
			if len(box) > 0:
				if not d[i]["company"] in box:
					out = False
			if len(time_str) > 0 and out:
				time = time_str.split(':')
				time[0] = (int)(time[0])
				time[1] = (int)(time[1])
				time_s = d[i]["time_s"].split(':')
				time_e = d[i]["time_e"].split(':')
				time_s[0] = (int)(time_s[0])
				time_e[0] = (int)(time_e[0])
				time_s[1] = (int)(time_s[1])
				time_e[1] = (int)(time_e[1])
				if time_e[0] <= 12:
					time_e[0] += 24
				result1 = True
				result2 = True
				if time_s[0] > time[0]:
					result1 = False
				elif time_s[0] == time[0] and time_s[1] > time[1]:
					result1 = False
				elif time_e[0] < time[0]:
					result1 = False
				elif time_e[0] == time[0] and time_e[1] < time[1]:
					result1 = False
				if result1:
					out = True
				else:
					time[0] += 24
					if time_s[0] > time[0]:
						result2 = False
					elif time_s[0] == time[0] and time_s[1] > time[1]:
						result2 = False
					elif time_e[0] < time[0]:
						result2 = False
					elif time_e[0] == time[0] and time_e[1] < time[1]:
						result2 = False
					if not result2:
						out = False
			if len(metro) > 0 and out:
				l = list((Counter(metro)&Counter(d[i]["metro"])).elements())
				if len(l) == 0:
					out = False
			if out:
				ids.append(i)
		for i in box:
			ops_check.append(i)
		for i in metro:
			ops_check.append(i)
	return redirect('/')