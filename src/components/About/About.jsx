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
            Reading fluency is the the ability to read with speed, accuracy, and
            proper expression. Echo Reader was designed to evaluate a student's
            reading accuracy. Reading accurately requires a skill called
            decoding. When a student decodes a word, they are not guessing or
            using context clues. Accurate decoding means the student reads
            exactly what is on the page.
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
            As a former teacher, I've seen first hand how poor reading
            negatively impacts a student's ability to have success across all
            subjects. No matter what the domain, reading is the gateway to
            understanding.
          </p>

          <p>
            Written language is one of the earliest human technologies that
            allowed human civilations to make leaps in its development. Before
            the internet, written language allowed information to be stored over
            time and shared with the masses. </p><p>Tools exist now to read
            things for us, but even with this, reading remains in many cases, a
            far more efficient way to consume information compared to listening
            alone.
          </p>

          <p>
            Students develop crucial learning skills like the ability to sustain
            focus and attention while reading.
          </p>
          <p>
            
            Reading alone, is not the only skill that affects a learners ability
            to access material, but is a crucial leg of the the table that
            supports overall learning.
          </p>
        </div>

        <div className="card  about-page__card flex-col">
          <h2>Future Developoment Plans</h2>
          <p>
            Echo Reader is currently a proof-of-concept and has quite a way to
            go in terms of making the interface more appealing to young readers
            and improving the feedback given to students. The application will
            be further improved by allowing students to have accounts that stores reading history to track improvement and focus on challenging areas.
          </p>

          <p>
            Other improvements will include the ablitly to target a specific
            reading level and skill when generating sentences to read as well as
            using an AI image generator - OpenAi's Dall-e image genrator, for
            example - to spice up the reading experience for beginning readers.
          </p>
        </div>
        <div className="card  about-page__card flex-col">
          <h2>Limitations</h2>
          <p>
            Because of the nature of the tech used in mobile devices and certain
            browsers beyond our control, Echo Reader perfrom best on desktop or
            laptop computers using Firefox or Chrome browsers. Using Echo
            Reading on mobile devices and tablets is no recommended.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
