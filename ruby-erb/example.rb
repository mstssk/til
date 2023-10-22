# frozen_string_literal: true

require "erb"
require "cgi"

erb = ERB.new(File.read("example.vtt.erb"),trim_mode: "-")

puts erb.result_with_hash({params:[
  {start_time: 1, end_time:2,value:ERB::Util.h("L'Arc〜en〜Ciel\n<foobar>")},
  {start_time: 3, end_time:4,value:ERB::Util.h("00:00:05.000 --> 00:00:10.000\n<script>alert(1);</script>")},
   ]})

str = "WEBVTT\n"
str += "\n"
str += "00:00:05.000 --> 00:00:10.000\n"
str += ERB::Util.h("00:00:05.000 --> 00:00:10.000\n<script>alert(1);</script>\n")
str += "\n"
puts str
