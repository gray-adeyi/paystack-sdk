# @gray-adeyi/paystack-sdk

A paystack client SDK for the javascript runtime.

- Documentation:
  [https://gray-adeyi.github.io/paystack-sdk](https://gray-adeyi.github.io/paystack-sdk)
- Source Code:
  [https://github.com/gray-adeyi/paystack-sdk](https://github.com/gray-adeyi/paystack-sdk)


## Why?

Searching the keyword `paystack` on npm's package registry returns 126 search results of
paystack related projects from client packages to CLIs to framework related packages as at the time of the writing of this documentation, certainly the number will continue to go up because there will always be people who like to build stuff and people who think what is out there can be made better. 

As a self taught developer with a python background, somewhere around 2016 when I was still very much a noob(I still am 😂, just cooler), I had a website i was building at the time in Django that needed payment integrations. I had limited knowledge of how things worked but I
was able to get the feature to work in my spaghetti code with the help of a package called
[Pypaystack](https://github.com/edwardpopoola/pypaystack). It was magic for me because i had
previously used `requests` in python which is similar to what `axios` and `fetch` api does but
for the python ecosystem and I hated it because I was suffering from severe skill issue. That
little abstraction of providing functions and methods that encapsulated all the implementations details needed to make an api call made all the difference for me as a beginner. It's safe to say that author was my hero as this became my go to package when I needed payment integration. Over the years, the project was no longer actively maintained and
I experienced this issue where the package breaks my web apps when I tried to deploy it on Heroku (they still had a free tier then, good times 😮‍💨). Looking for the fix i stumbled upon an open issue [https://github.com/edwardpopoola/pypaystack/issues/11](https://github.com/edwardpopoola/pypaystack/issues/11) for the setback i was experiencing. It was as a result of how the project way publish, it used a `setup.py` file which was an old but still valid method
of publishing a python package. I was pushing for using a new tool at the time called `poetry`
to simplify the publishing of the package (cool tools have come after like `uv` which i think is the coolest now) but was unable to the maintainer of the project. I looked at other projects but i experienced issues like the other packages I tried out didn't work, there wasn't enough documentation on how to us them or the package had methods with camel case instead of snake case with the norm in the python ecosystem. Sure `PaystackClient.miscellaneous.getBanks` looks cool in in a javascript code, I don't want to have to type that
as a python developer, but this is not a story about python. I later had to fork `Pypaystack`,
copied parts of it's code that were relevant to my needs and the job is done. I remember making a [youtube video](https://youtu.be/MrqWC1ByqKo?si=qvkDrXF6RiFT4ElS) of this hack. It was a bad idea looking back in time because i had to copy the package for every new project i was working on but it worked.

I got my first professional developer role in July of 2022 which shaped and refined me. It was and still is overwhelming and requires me to push beyond my bounds. My typical self would shy away
from the hard stuff which is not really a great trait for a developer. The nature of the job
is problem solving and it's the most challenging part for me (my boss complains about it sometimes). I probably learnt how to avoid trouble so well that I need to unlearn it or I took
quotes like "When action grows unprofitable, gather information; when information grows unprofitable, sleep." or "Don't try" by Charles Bukowski out of context. All days weren't entirely bad days, I've had my fair share of good days when I think to myself, this has to be
the best job in the world. While working, I had to work with `requests` that I avoided and got
pretty comfortable with it. It was then went back into the source code for `Pypaystack` and
how it worked made sense to me, so i decided to work on an official fork which led to the 
creation of [Pypaystack2](https://gray-adeyi.github.io/pypaystack2/). There were a lot of 
similar packages as stated earlier but it was a leaning process for me, I made some mistakes,
I tried some new things like building a CLI and adding async support, My profession job has
once required me to write a little bit of GO (I didn't do amazingly well an had to work on
another task but the language stuck, I definitely want to be decent in the language someday).
So I thought to myself why not write a GO version which I did, then for dart (I still don't
know flutter to this day 😭). Currently, my day job requires me to write a lot of javascript
which lead to me challenging myself to create this project. I probably should stop writing
client libraries and start working on those hard projects i've left incomplete.

Now that you have enough context as to what drives me, Here's my why.
1. **I do it because i love doing it.** I love to see that something i built works for 
  someone else. The number of downloads and stars gives me chills like i have a place in this
  world. After a shitty day at work when my boss's expectations of me are high and I don't 
  meetup those demands, I look to other things that I've done that are working as a motivation
  to try again, it's just a skill issue. And so that i don't start considering other career
  paths when the python bites me 😂, or start believing what Github Roast AI says 
  [about me](https://github-roast.pages.dev/share/gray-adeyi/?lang=english)
2. **I've been there before.** What most of these projects have in common apart from all
  being paystack related tooling,is that i try to make sure that they are easy to use by providing
  detailed documentation because it's what I noticed most similar packages lacked. Nevertheless, the efforts of these other package authors should not be discredited as
  these endeavors are no easy feats 

## Features

- Typescript support
- Supports multiple Javascript runtime (Node, Bun, Deno)
- Automatic case transformation of payload and response data

## [Get Started](/get-started)

## License

This project is licensed under the terms of the MIT license.


## Contributors

- [gray-adeyi](https://github.com/gray-adeyi)
- [Hallowdread](https://github.com/Hallowdread)

## Sponsor this project

- Give this project a star on [Github](https://gray-adeyi/paystack-sdk)
- Buy me a coffee: https://www.buymeacoffee.com/jigani

## Other Related Projects from this Author

- **CLI (In python):** https://github.com/gray-adeyi/paystack-cli
- **SDK (Python):** https://github.com/gray-adeyi/pypaystack2
- **SDK (Go):** https://github.com/gray-adeyi/paystack
- **SDK (DART):** https://github.com/gray-adeyi/paystack_dart