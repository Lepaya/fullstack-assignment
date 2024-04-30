### 1. How long did you spend on the coding test?

To be honest, I probably spent about 2 full workdays of time on this. It was a
combination of wanting to try new things and wanting to make a bit of an impression.

### 2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

The main things I skipped were:

1. Writing feature tests to verify that the repositories work as expected
2. A bit more defensive programming to handle error states
3. Checking if it works properly in browsers outside of Chromium-based ones
4. Optimise image assets

Although it depends on the scope and longevity of the project. Smaller projects might call for a lighter approach.

### 3. Describe your solution in plain english. Point out your design decisions and the reasoning behind them.

#### From non-tech perspective

I wanted to make a fun looking app to check your fruit stats. The user is instructed what to do each step of the way.
Since you would probably view fruit stats and manage one location at a time, you only select the office once at the top.
The selected office is used to show stats and purchase fruit. I also called it office instead of location because that was
the non-tech term used in the briefing. While location was mainly mentioned in the database schema.

#### From tech perspective

1. I am a big fan of TDD, so I test drove most components and some of the backend classes. This helps me design the API and gives me the confidence that it works as it should.
2. I abstracted a bunch of specific logic behind hooks or interface implementations. This makes it easier to swap out implementations without having to change code all over the app. (for example when implementing endpoints to retrieve locations instead of hardcoding them)

### 4. Have you learned something new doing this test? If yes, describe it here.

A lot.

I tried my hand at the following:

1. Making a visual design. I am not a designer, but do like playing around with it. It has been a while though. I wanted to make it look a little nice.
2. React Query. I had not used it before, I appreciated the API that resembles Apollo Client (Graphql).
3. Radix Primitives. This component library was on my list for a while. I took this as an excuse to try it out. I would highly recommend it. It makes it trivial to create accessible components with their own unique style.
4. `pg` library. I wanted to write raw queries without having to resolve to a complex ORM. This library was perfect for this use case.
5. I love Graphql. I have gotten very used to everything that comes with using Graphql over the years. Having to set up components of the API request lifecycle manually has made me appreciate it even more.
6. Generating images with AI. I wanted to generate some fruit stickers for the statistics. It took a bit of trial and error, plus some extra editing to make it look presentable.

### 5. Describe yourself using JSON.

```json
{
  "name": "Sam de Vries",
  "gender": "male",
  "age": 32,
  "family": {
    "wife": {
      "name": "Vanessa",
      "age": 31
    },
    "children": [
      {
        "name": "Archie",
        "age": 3,
        "gender": "male"
      },
      {
        "name": "Lucy",
        "age": 1,
        "gender": "female"
      }
    ]
  },
  "hobbies": [
    "video games",
    "board games",
    "sci-fi and fantasy books, movies and TV shows",
    "DIY electronics"
  ],
  "possessions": ["3d printer"],
  "isNerd": true,
  "location": "Oostzaan"
}
```
