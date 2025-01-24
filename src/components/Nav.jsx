import bolt from "../assets/img/bolt.svg";
import { Timer } from "../components/Timer";
export const Nav = ({ difficulty, score }) => {
  return (
    <div className="flex justify-center items-center min-h-[10vh] nav">
      <div className="flex flex-row justify-center items-center space-x-96 text-xl">
        <div className="difficulty flex justify-center items-center">
          <div className="loop flex items-center nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <mask id="lineMdSpeedLoop0">
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-dasharray="56"
                  stroke-dashoffset="56"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 19v0c-0.3 0 -0.59 -0.15 -0.74 -0.41c-0.8 -1.34 -1.26 -2.91 -1.26 -4.59c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 1.68 -0.46 3.25 -1.26 4.59c-0.15 0.26 -0.44 0.41 -0.74 0.41Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="1.68s"
                    values="56;0"
                  />
                </path>
                <g transform="rotate(-100 12 14)">
                  <path d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="1.12s"
                      dur="0.56s"
                      values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14C8 11.79 12 0 12 0C12 0 16 11.79 16 14Z"
                    />
                  </path>
                  <path
                    fill="#fff"
                    d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="1.12s"
                      dur="0.56s"
                      values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 12 4 12 4C12 4 14 12.9 14 14Z"
                    />
                  </path>
                  <animateTransform
                    attributeName="transform"
                    begin="1.12s"
                    dur="16.8s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="-100 12 14;45 12 14;45 12 14;45 12 14;20 12 14;10 12 14;0 12 14;35 12 14;45 12 14;55 12 14;50 12 14;15 12 14;-20 12 14;-100 12 14"
                  />
                </g>
              </mask>
              <rect
                width="24"
                height="24"
                fill="#000"
                mask="url(#lineMdSpeedLoop0)"
              />
            </svg>
          </div>
          <div className="text font-Outfit nav">{difficulty}</div>
        </div>
        <div className="clock flex flex-row justify-center items-center">
          <div className="digital-clock flex justify-center items-center">
            <div className="clock">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                />
                <rect width="2" height="7" x="11" y="6" fill="#000" rx="1">
                  <animateTransform
                    attributeName="transform"
                    dur="18s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </rect>
                <rect width="2" height="9" x="11" y="11" fill="#000" rx="1">
                  <animateTransform
                    attributeName="transform"
                    dur="1.5s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </rect>
              </svg>
            </div>
            <div className={`clock-text font-OCR nav `}>{<Timer />}</div>
          </div>
        </div>
        <div className="streak flex flex-row justify-center items-center">
          <img src={bolt} alt="bolt" className="w-7" />
          <div className="font-Outfit nav">{score > 0 ? score : 0}</div>
        </div>
      </div>
    </div>
  );
};
