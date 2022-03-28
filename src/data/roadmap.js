const appDev = 'App Development'
const chainDev = 'Blockchain Development'
const chty = 'Charity & Foundation'
const admin = 'Administrative'
const exp = 'Customer Experience'
const mktg = 'Marketing & Promotion'

const roadmap = [
  {
    id:'rm-fiat-onboarding',
    category: appDev,
    title:'Fiat Onboarding',
    explanation:'This feature will enable our community to purchase ETH with their bank accounts or credit cards directly from within our dApp.',
    assessment:'Investigations into this feature have been very optimistic that we can bring this to fruition quite soon.  In fact, we plan to give our community multiple options by integrating additional 3rd party vendors into our application.',
    tasks:[
      'design',
      'implement',
      'test',
      'release',
    ],
    latest:'Development on this feature is currently in progress.',
    progress:33,
    bgImage:'',
  },
  {
    category: chty,
    title:'Establish the Froge Foundation',
    explanation:'FrogeX will establish an independent foundation, that will administer all generated charity funds and donate them to ecodefi charity. The FrogeX team will incorporate a foundation in the Netherlands, and help the foundation in setting up it\'s digital infrastructure',
    outlook:'Complete!',
    tasks:[
      'Incorporate Foundation',
      'Set up Foundation website',
      'Setup Donation Charter',
      'Seek publicity for the Foundation',
    ],
    latest:'',
    progress:100,
    bgImage:'',
  },
  {
    category: Listings,
    title:'Hybrid Eco-DEX',
    explanation:'The creation of a Decentralized Exchange with in-built fiat onboarding and offboarding that operates via a layer 2 abstraction to save gas and gives a portion of the fees collected to Eco-Charities and other Environmental Causes. This would operate using the Uniswap liquidity pools for any tokens listed rather than establishing new pools',
    assessment:'To launch this we will need to',
    tasks:[
      'Establish a reliable means of onboarding and offboarding Crypto to and from Fiat',
      'Establish or Adopt a Layer 2 solution which allows for extreme gas savings',
      'Create a governance body for the Exchange',
      'File any requisite paperwork to get the Exchange legally recognized',
      'Link with existing Uniswap Liquidity pools',
    ],
    latest:'',
  },
  {
    category: Marketing,
    title:'Montel Williams: The FrogeX Fighter',
    explanation:'By backing Montel Williams and helping him and his coaching team to reach the UFC or other National or World level events we can utilize the attention on him to raise awareness of FrogeX with a wide audience of MMA enthusiasts',
    assessment:'We can accomplish this by',
    tasks:[
      'Sponsoring Montel',
      'Having PR events like AMAs and Meetups with Montel',
      'Arranging Watch Parties for Fights Montel is in',
    ],
    latest:'',
  },
  {
    category: Functionality,
    title:'FrogeX Eco-Investment Portfolio',
    explanation:'This would be an addition to our Hybrid Eco-DEX where fiat users could put money into a managed portfolio of Eco-Defi coins that will not only save the planet but generate a nice amount of dividend income between 3-6% Quarterly. This would be a good option for those who are Eco-Conscious and understand the power of Cryptocurrency but who either do not have the time or knowledge to Invest on their own',
    assessment:'We can establish this by',
    tasks:[
      'Creating a separate Legal Entity for this kind of business',
      'Gaining the regulatory approval to act as a management fund',
      'Marketing our new service to Older and Busier clienteles',
    ],
    latest:'',
  },
  {
    category: Functionality,
    title:'FrogeX as Currency on Digital Platforms',
    explanation:'We convince gaming and merchant platforms to accept and use FrogeX as currency. Platforms like Steam, Amazon, Ebay, Humble Bundle, and smaller retail groups could be convinced based on the Eco-conscious nature and the ETH rewards function of FrogeX',
    assessment:'We can accomplish this by',
    tasks:[
      'Making business relationships with retailers',
      'Demonstrating the ease of use and potential gains for doing so',
      'Creating a Layer 2 business platform or using an existing one like Kranz',
    ],
    latest:'',
  },
  {
    category: admin,
    title:'CMC/CG listing',
    explanation:'FrogeX will apply for the great market listings after launch, so the great public can find out about FrogeX.',
    assessment:'Listing will take some time as we need to adhere to CMC/CG standards first. We will file for application as soon as possible.',
    tasks:[
      'File CG application',
      'File CMC application',
      'Listings Occur',
      'Retract the v1 Froge Finance page',
    ],
    latest:'',
  },
  {
    category: chainDev,
    title:'Fantom Bridge',
    explanation:'FrogeX will ultimately rule all chains. We will start our expansion on the Fantom chain by building a bridgeapp and Fantom smart contract.',
    assessment:'Bridging will require building a dApp to easily swap from one chain to another (and incorporate multichain compatibility in the future) and a Fantom smart contract.',
    tasks:[
      'Build bridge interface',
      'Set up Fantom smart contract',
      'Deploy an FAQ for using it',
      'Launching the bridge',
    ],
      latest:'',
},
  {
    category: Marketing,
    title:'FrogeX Link Competition',
    explanation:'A contest to bring in new tg members and holders as well as getting eyes on our Website. Prizes offered for 1st, 2nd, and 3rd places. Participants will receive a unique bit.ly (or other similar tracking service) link to our website or telegram. Whoever\'s link brings in the most views, member adds, and buys will win.',
    assessment:'We can accomplish this by',
    tasks:[
      'Figuring out how to track tg adds / buys off a link click',
      'Having funds on hand to give out FrogeX and maybe ETH in prizes',
      'Getting enough community involvement to actually have a reasonable competition',
      'Figuring out just how invasive a link\'s datamining can be without actually being illegal',
    ],
    latest:'',
  },
  {
    category: appDev,
    title:'Froge Dashboard/Dapp',
    explanation:'FrogeX has a revolutionary “gasless” contract and uses less gas than any other comparable token on the Ethereum blockchain. We will create a dashboard/dapp to easily withdraw your ETH dividends and look at some very interesting statistics!',
    assessment:'Designing, programming, implementing and testing the dashboard/dapp until it is ready for public launch!',
    tasks:[
      'Designing dashboard/dapp',
      'Coding it',
      'Testing phase',
      'Public launch!',
    ],
    latest:'',
  },
  {
    category: appDev,
    title:'Froge NFT\'s',
    explanation:'FrogeX will join the NFT market with it\'s "Bored Froge Lambo Club" NFT-series. All will be available on a special minting website with part of the proceeds of course going to ecodefi charity!',
    assessment:'The NFT-series will have to be graphically and artistically top of the bill. To achieve this we are seeking cooperation with ecodefi artists. Once the artwork is done the special minting website needs to be programmed and deployed. We will seek verification on Opensea before launch.',
    tasks:[
      'Allying with ecodefi artists',
      'Setting up the artwork',
      'Setting up the minting site',
      'Launch on Opensea',
    ],
      latest:'',
},
  {
    category: Marketing,
    title:'FrogeX in Office',
    explanation:'Using Marketing and/or Charity funds FrogeX would back local and state level politicians in the US and other countries to push Eco-conscious and Transparency agendas. Targeted offices would be Mayors, Treasurers, Attorney Generals, Comptrollers, Governors, Local and State Assemblypersons, and any other position that might have sway over ecologic decisions',
    assessment:'We can accomplish this by',
    tasks:[
      'Choosing existing candidates or inspiring new candidates',
      'Financially and Tangibly backing their bids for office',
      'Preparing tactical plans for the candidates to use when running',
      'Preparing agendas and networking the candidates with other candidates who are either backed by us or share similar goals',
    ],
    latest:'',
  },
  {
    title:'Game/Event Night',
    description:'Games and fun for all, hosted by TBD!',
    outlook:'All we need is a host!',
    tasks:[
      'find a host',
      'set a time',
      'help host with content/games ideas',
      'attend and have fun!',
    ],
    latest:'',
  },
  {
    title:'A Froge Dream',
    description:'We will compose and produce a video sequence depicting a person\s inspiration' +
      'and journey to save the rainforests - with Froge!',
    outlook:'This one depends on the creative process.',
    tasks:[
      'make a storyboard',
      'write dialog/content',
      'find artist to work with',
      'secure funding for artist',
      'watch together!',
    ],
    latest:'',
  },
  {
    title:'X Games Sponsorship',
    description:'We will Frogeify an athlete for the coming X Games!',
    outlook:'Sponsorships are a fairly straightforward process, just need the funding!',
    tasks:[
      'research how to sponsor',
      'establish contact',
      'secure funding',
      'watch together!',
    ],
  },
  {
    title:'Froge Lounge',
    description:'We will create a chat+stream lounge on our own domain. Stream our pet frog, ' +
      'stream anything David Attenborough has done, anything nature related. ' +
      'Just somewhere to go to and catch a vibe.',
    outlook:'We need to decide on the approach, and decide on how this would be time-slotted',
    tasks:[
      'Decide priority VS other cards',
      'Design the approach & scope',
      'Figure out when this work would be done',
      'chill in the lounge!',
    ],
  },
  {
    title:'Awesome Thing',
    description:'This feature will ',
    outlook:'We can accomplish this by ',
    tasks:[
      'design',
      'implement',
      'test',
      'release',
    ],
  },
]
