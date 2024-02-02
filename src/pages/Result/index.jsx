const CircleSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="201" height="200" viewBox="0 0 201 200" fill="none">
    <circle cx="99.4267" cy="98.5185" r="73.5556" stroke="#00B154" stroke-width="4" stroke-dasharray="1 6"/>
    <circle cx="99.4261" cy="98.5185" r="71.8518" fill="#F8F8F8"/>
    <g filter="url(#filter0_d_851_2157)">
      <circle cx="99.6489" cy="98.5185" r="60.7407" fill="white"/>
    </g>
    <path d="M200.908 100C200.908 155.228 156.137 200 100.908 200C45.6797 200 0.908203 155.228 0.908203 100C0.908203 44.7715 45.6797 0 100.908 0C156.137 0 200.908 44.7715 200.908 100ZM20.9082 100C20.9082 144.183 56.7254 180 100.908 180C145.091 180 180.908 144.183 180.908 100C180.908 55.8172 145.091 20 100.908 20C56.7254 20 20.9082 55.8172 20.9082 100Z" fill="#F5F5F5"/>
    <defs>
      <filter id="filter0_d_851_2157" x="18.9082" y="21.7778" width="161.482" height="161.481" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="10"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_851_2157"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_851_2157" result="shape"/>
      </filter>
    </defs>
  </svg>
)

const ProgressSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="199" height="199" viewBox="0 0 199 199" fill="none">
    <path d="M91.6961 10.3297C91.2188 4.86225 95.2698 -0.012167 100.758 0.0561637C118.26 0.274106 135.456 5.13348 150.561 14.2223C168.515 25.0256 182.593 41.2499 190.777 60.5699C198.962 79.8898 200.832 101.314 196.12 121.771C191.408 142.228 180.356 160.668 164.548 174.448C148.74 188.228 128.987 196.641 108.121 198.481C87.2549 200.321 66.3464 195.493 48.3922 184.69C30.438 173.887 16.36 157.662 8.17577 138.342C1.28665 122.08 -1.12867 104.326 1.0897 86.9135C1.78258 81.4749 7.16578 78.1419 12.5069 79.3751C17.8407 80.6067 21.1003 85.9293 20.5426 91.3758C19.1807 104.676 21.1821 118.163 26.4359 130.565C32.9833 146.021 44.2457 159 58.6091 167.643C72.9724 176.286 89.6992 180.148 106.392 178.676C123.085 177.204 138.887 170.474 151.534 159.45C164.18 148.425 173.022 133.673 176.791 117.308C180.561 100.942 179.065 83.8031 172.517 68.3471C165.97 52.8911 154.707 39.9117 140.344 31.269C128.835 24.3436 115.807 20.4876 102.496 19.9861C97.0086 19.7794 92.1737 15.8002 91.6961 10.3297Z" fill="url(#paint0_linear_835_2104)"/>
    <defs>
    <linearGradient id="paint0_linear_835_2104" x1="11.2058" y1="106.721" x2="147.124" y2="19.1114" gradientUnits="userSpaceOnUse">
      <stop stop-color="#037847"/>
      <stop offset="1" stop-color="#43D590"/>
    </linearGradient>
    </defs>
  </svg>
)


const Result = () => {
  return (
    <div class="h-screen bg-[#F1F1F8]">
      <div class="px-24 h-screen">
        <div class="flex pt-12 justify-between mb-5">
          <div class="flex w-full">
            <img src="/src/assets/avatar.svg" alt="" />
            <p class="flex items-center pl-3 text-2xl font-semibold">
              Mohammed Bebars
            </p>
          </div>
          <div><img src="/src/assets/EDC_Icon.png" alt="" /></div>
        </div>
        <div class="w-full h-4/5 bg-white rounded-t-2xl rounded-b-2xl">
          <div class="py-6 px-12 bg-[#F5F5F5] rounded-t-2xl flex">
            <div class="w-3/12">
              <p class="text-gray-400 font-semibold">Switch Language</p>
              <div class="flex flex-row space-x-2">
                <img src="/src/assets/language.svg" alt="" height="16" width="32" />
                <p>Arabic</p>
              </div>
            </div>
            <div class="grow">
              <p class="font-bold text-center text-3xl">Test Result</p>
            </div>
            <div class="w-3/12"></div>
          </div>
          
          <div class="py-6 px-12 h-4/5 overflow-scroll overflow-x-hidden">
            <p className="text-xl font-bold capitalize text-center">You have completed the test, here is your test result</p>

            <div className="w-full flex items-center justify-center">
              <div className="flex flex-row py-9 w-9/12">
                <div className="w-6/12 flex flex-col">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <ProgressSVG />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl">Student Name: <span>Mohamed Bebars</span></p>
                    <p className="text-xl">Student ID: 12387634</p>
                    <p className="text-xl">Test Date: 27 January 2023  19:28</p>
                    <p className="text-xl">Duration 23m : 25s</p>
                    <p className="text-xl">Device Type: Laptop</p>
                  </div>
                </div>
                <div className="w-6/12 flex flex-col">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <ProgressSVG />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl"><span>05</span> Violations Detected</p>
                    <p className="text-xl">Face Violation: <span>2 times</span></p>
                    <p className="text-xl">Noise Violation: <span>3 times</span></p>
                    <p className="text-xl">Tab Switched: <span>0 times</span></p>
                    <p className="text-xl">Tracking </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div class="py-6 px-12 bg-[#F5F5F5] rounded-b-2xl">
            <button
              class="px-4 py-2 bg-[#025EE1] text-white rounded-lg w-auto hover:bg-[#332A7C]"
            >
              Confirm and Continue
            </button>
          </div>
        </div>
        <div class="fixed bottom-0 mb-3 ml-11">
          <p class="text-[#CCC]">
            Copyright © 2024 Performise Labs, all rights reserved
          </p>
        </div>
      </div>
    </div>

  )
}

export default Result