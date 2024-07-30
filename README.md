# ActivitiesDB
### Your personal online guidance counselor

ActivitiesDB is a website I am building to help high school students find educational oppurtunities. Users can browse our database of activities and save them to their account. To help in finding the best activities for users, I have implemented a tag filter feature.

The following are screenshots of the website in its current form. There is still a lot of work to do, including adding more features and drastically updating the UI. I hope to one day release the website to the public.
<br />
<br />
<br />
<br />
![Homescreen](https://github.com/user-attachments/assets/4025878f-9778-4bc0-bbb1-1fc7cdead04c)
>_The ActivitiesDB Homescreen_

The current homescreen is pretty plain, but it quickly conveys all the information the user needs to know.

<br />
<br />

![ActivityList](https://github.com/user-attachments/assets/04ff163f-04b1-4d97-8d3d-17dac929dfa5)
>_The ActivitiesDB activity list_

I have only created 3 activities as of now since I wanted to test other features before I add a lot of activities.

<br />
<br />

![StudyAbroadSort](https://github.com/user-attachments/assets/fd5ff08f-5504-466a-9388-69ed53e8b0d9)
>_The tag filter feature in action. In this example, I filtered activities by the Study Abroad tag._

The feature also supports filtering by multiple tags at once. I will add many more tags in the future. Tags are stored in a collection in the database so it is easy to add and update tags.

<br />
<br />

![SignupPage](https://github.com/user-attachments/assets/61633ee2-8511-469d-8929-8c70c5599aa8)
>_The sign up page. Each field will highlight red if the user clicks in then out to show it is a required field._

The website uses JSON web tokens for authentication.

<br />
<br />

![LoginPage](https://github.com/user-attachments/assets/103792b8-991b-401d-99ad-9258126cabc6)
>_The login page_

The website will keep a valid user logged in for 1 hour so that even if the user refreshes, they will remain logged in.

<br />
<br />

![SaveChangeList](https://github.com/user-attachments/assets/725efd54-d715-4955-be6f-98db1805ee23)
>_After logging in, a user can save activities. Once saved, the activity's save button will turn red._

Only logged in users can save activities. Saved activities are saved to the user's document in the database. In the future, I am going to make the save button a heart rather than a plain button.

<br />
<br />

![ProfilePage](https://github.com/user-attachments/assets/4b4f0cb1-1498-4207-82e4-187cf35c9343)
>_Part of the profile page. Currently, the page is **extremely** rough. Saved activities are shown._

Only logged in users can save activities. Saved activities are saved to the user's document in the database. In the future, I am going to make the save button a heart rather than a plain button.

<br />
<br />

Besides the ability to click on each activity to open it up and get more info, that is all the features I have implemented for ActiviitiesDB. This project has taught me a lot about web development and I am sure I will continue to learn even more as I add more features and styling.

I look forward to developing ActivitiesDB further and one day releasing the website to the public.
## Thank you for taking the time to learn about my project!
