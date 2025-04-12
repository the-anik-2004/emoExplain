// import { FontAwesomeIcon } from '../../public/icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const DeveloperContact = () => {
  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-zinc-900/50 p-8 rounded-2xl shadow-lg border border-zinc-700">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-orange-400 mb-4">
          <span className="mr-2">👨‍💻</span>
          <Typewriter
            words={['Contact the Developer', 'Say Hello 👋', 'Have Feedback?']}
            loop={0} // set to 0 for infinite loop
            cursor
            cursorStyle="🪄"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-gray-300 mb-6 text-lg">
          Hey there! I'm <span className="font-bold text-white">Anik</span>, the developer of this project. If you have any suggestions, feedback, or just want to say hi, feel free to reach out through any of the platforms below!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://www.instagram.com/anikpal_/" target='_blank'>
            <img src="/instagram.png" alt="Instagram" className="w-20 aspect-square" />
          </Link>
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://www.facebook.com/profile.php?id=100085955671264" target='_blank'>
            <img src="/facebook.png" alt="Facebook" className="w-20 aspect-square" />
          </Link>
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://discordapp.com/users/1281487457958891605" target='_blank'>
            <img src="/discord.png" alt="Discord" className="w-20 aspect-square" />
          </Link>
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://github.com/the-anik-2004" target='_blank'>
            <img src="/github.png" alt="GitHub" className="w-20 aspect-square" />
          </Link>
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://www.linkedin.com/in/the-anik-pal/" target='_blank'>
            <img src="/linkedIn.png" alt="LinkedIn" className="w-20 aspect-square" />
          </Link>
          <Link className="animate-pulse bg-gray-700/50 rounded-full p-1  border flex items-center justify-center" to="https://x.com/anikpal_?t=7LjD7Cimo8GY5xOKuSQ_cQ&s=08" target='_blank'>
            <img src="/x.png" alt="Twitter/X" className="w-20 aspect-square" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DeveloperContact;
