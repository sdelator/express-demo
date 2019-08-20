google apps -- PostMan

tested
GET - grab information
DELETE - delete course
PUT - update course
POST - add a new course

**for delete you do not need to add a body message and specify which course you are deleting in endpoint
http://localhost:3000/api/courses/4

**for post you need to add a course name thats longer than 3 letters and add to general courses category
http://localhost:3000/api/courses 
{
   "name": "course54m3"
}

**for put you update and you need to specify which course id in the endpoint and new course name
http://localhost:3000/api/courses/1
{
   "name": "coursemook"
}

**for get you do not need to add body message. This retreives all info 
http://localhost:3000/api/courses


