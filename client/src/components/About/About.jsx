// import goScreenComputer from "../../assets/go-screen-computer.png";
// import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

const About = () => {
  return (
    <div className="page mb-10 ">
      <div className="page-content-container page-content-container__about-page">
        <h1>About Echo Reader</h1>
        <div className="card  about-page__card flex-col">
        <h2>What Echo Reader Does</h2>
          <p>
          Reading fluency is the ability to read with speed, accuracy, and proper expression. Echo Reader was specifically designed to evaluate a student's reading accuracy, which is closely tied to the skill of decoding. Accurate decoding means that students are not guessing or using context clues to read words, but instead reading exactly what is on the page. With Echo Reader, students can practice decoding and improve their reading accuracy, which is essential for developing reading fluency.
          </p>
          <p>
            Helping a student practice decoding traditionally requires one on
            one intervention from a teacher. How else would the student know
            whether they read a word correctly or not? Echo Reader is like
            having an extra asistant in the classroom. The student reads a
            sentence aloud and Echo Reader analyzes the student's reading for
            errors.
          </p>

          <p>
            With the help of ChatGPT, the student receives feedback not only on
            whether they read the words correctly or incorrectly, but also what
            type of reading errors were made.
          </p>
        </div>

        <div className="card  about-page__card flex-col">
          <h2>Why Echo Reader Was Created</h2>
          <p>
          As a former teacher, I have witnessed firsthand how poor reading skills can adversely affect a student's success across all subjects. Regardless of the subject area, reading serves as a gateway to understanding. Without the ability to read proficiently, students may struggle to comprehend and apply concepts, instructions, and information presented in different formats. As a result, it is crucial to prioritize the development of reading skills in students to enable them to succeed academically and beyond.
          </p>

          <p>
          Written language is one of the earliest human technologies, enabling civilizations to advance rapidly. Prior to the internet, it allowed information to be stored over time and disseminated widely. Although there are now tools available to read things aloud for us, reading is still, in many cases, a more efficient way to absorb information than listening alone. Even with the assistance of technology, reading can help us understand complex concepts and retain information more effectively.
          </p>

          <p>
          Students develop important learning skills, such as the ability to sustain focus and attention while reading. This skill is crucial for academic success and valuable for many areas of life. Therefore, it is essential to nurture its development in students early on.
          </p>
          <p>
            
          While reading is not the only skill that affects a learner's ability to access material, it is an essential component that supports overall learning. Reading serves as a crucial foundation upon which other academic skills can be built. Without proficient reading skills, learners may struggle to comprehend, analyze, and interpret written content across all subject areas. Therefore, it is vital to recognize the significance of reading and to focus on developing and improving this skill to support academic success.
          </p>
        </div>

        <div className="card  about-page__card flex-col">
          <h2>Future Developoment Plans</h2>
          <p>
          Although Echo Reader is already functional as a proof-of-concept, there is still a long way to go in terms of enhancing the interface to make it more appealing to young readers and providing better feedback to students. In order to make the application more effective and engaging, we are currently working on several new features. One of the most important ones is the ability for students to create personal accounts, which will allow them to store their reading history and track their progress over time. This will enable them to focus on their challenging areas and monitor their improvements as they go along. We are committed to constantly improving Echo Reader, so that it can become the go-to tool for teaching reading to students of all ages.
          </p>

          <p>
          In addition to the existing features, we are working on incorporating several new improvements to enhance the reading experience. These will include the ability to target a specific reading level and skill when generating sentences to read, thereby providing personalized content to users. Furthermore, we plan to utilize advanced technologies like OpenAI's Dall-e image generator to create visual aids that can captivate and engage beginning readers. With these new features, we aim to make the process of learning to read more fun, interactive, and effective.
          </p>
        </div>
        <div className="card  about-page__card flex-col">
          <h2>Limitations</h2>
          <p>
          Due to the nature of the technology used in mobile devices and certain browsers beyond our control, Echo Reader performs best on desktop or laptop computers using Firefox or Chrome browsers. It is not recommended to use Echo Reader on mobile devices and tablets.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
