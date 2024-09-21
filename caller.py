import requests
content = '''Here's a sample club proposal that you can use as a template:

**Club Proposal:**

**Club Name:** [Insert Club Name, e.g. "The Debate Club"]

**Mission Statement:** To provide a platform for students to engage in intellectual discussions, develop critical thinking and public speaking skills, and foster a sense of community and camaraderie among members.

**Objectives:**

1. To create a space for students to engage in respectful and constructive debates on various topics, including current events, social issues, and philosophical concepts.
2. To provide opportunities for members to develop their critical thinking, research, and public speaking skills through debates, discussions, and presentations.
3. To foster a sense of community and inclusivity among members, promoting diversity of thought and opinion.
4. To collaborate with other clubs and organizations on campus to host joint events and activities.

**Activities:**

1. Weekly debates and discussions on various topics, led by a moderator or guest speaker.
2. Guest lectures and workshops on topics such as public speaking, debate techniques, and critical thinking.
3. Hosting debates and tournaments with other schools and clubs.
4. Organizing social events, such as movie nights, game nights, and potlucks, to foster a sense of community among members.
5. Collaborating with other clubs and organizations on campus to host joint events and activities.

**Membership:**

1. Membership is open to all students, faculty, and staff of [University/College Name].
2. Members are expected to attend regular meetings and participate in debates and discussions.
3. Members are encouraged to take on leadership roles and contribute to the planning and organization of events.

**Leadership:**

1. The club will be led by a President, Vice President, and Secretary/Treasurer.
2. The President will be responsible for overseeing the club's activities and events.
3. The Vice President will assist the President and take on leadership roles when needed.
4. The Secretary/Treasurer will be responsible for maintaining the club's records and finances.

**Budget:**

1. The club will operate on a budget of [$X] per year.
2. Funds will be allocated for guest speakers, materials, and events.
3. Members are encouraged to contribute to the club's budget through fundraising and donations.

**Timeline:**

1. The club will meet bi-weekly during the academic year.
2. The first meeting will be held on [Date] at [Time] in [Location].
3. The club will host its first event on [Date] at [Time] in [Location].

**Conclusion:**

The [Club Name] aims to provide a platform for students to engage in intellectual discussions, develop critical thinking and public speaking skills, and foster a sense of community and camaraderie among members. We believe that this club will be a valuable addition to the [University/College Name] community and look forward to working with students, faculty, and staff to make it a success.

**Appendix:**

* List of potential members and advisors
* Budget breakdown
* Event schedule
* Club constitution (if applicable)

Note: This is just a sample proposal and you should adjust it according to your club's specific needs and goals.
'''

print(requests.get("http://127.0.0.1:8000/", json={"text":content}).json())