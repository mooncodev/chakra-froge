const dev = 'App Development'
const chainDev = 'Blockchain Development'
const chty = 'Charity & Foundation'
const admin = 'Administrative'
const exp = 'Customer Experience'
const mktg = 'Marketing & Promotion'

const roadmapTemplate = [
  {
    title:'The Title',
    img:['017','046'],
    description:`This feature will...`,
    getInvolved:`Message us with...`,
    sizeRating:3,
    tasks:[
      'design', 'implement',
      'test', 'release',
    ],
  },
]

export const froadmapData_dev_general = [
  {
    title:'New Chain Token & Bridge',

    img:['008','037'],
    description:`FrogeX will eventually conquer all major blockchains. We are setting 
      our sights on bridging to an eco-conscious blockchain like 
      Cardano, Cronos, Fantom, or Avalanche.`,
    getInvolved:`If you are an expert or have opinions or detailed information about 
      any blockchain that FrogeX should look at bridging with, please contact the team.`,
    sizeRating:13,
    progress:5,
    tasks:[
      'Design Stage: Determine target chain',
      'Author new smart contract (Solidity)',
      'Author bridge contract (Solidity)',
      'Author bridge widget (UI)',
      'Author Guide/FAQ',
      'Launch!',
    ],
  },
  {
    title:'Froge Dashboard/Dapp',
    img:['010','039'],
    description:`FrogeX holders deserve a robust set of tools for checking and collecting 
    their ETH rewards as well as for monitoring their FrogeX holdings. The FrogeX 
    Dashboard dApp will allow our holders to do this and more.`,
    getInvolved:`Feature suggestions, and any bug/issue reports - please message the team, thanks!`,
    sizeRating:8,
    progress:90,
    tasks:[
      'Designing dashboard/dapp',
      'Coding it',
      'Testing phase',
      'Public launch!',
    ],
  },
  {
    title:'FrogeX Link Competition',

    img:['009','038'],
    description:`Our Telegram Group is the lifeblood of our community. 
    To bring even more people into our vibrant and expanding community 
    we will host a competition for inviting new members to the community. 
    Each contestant will be given a custom invite link and whoever gets 
    the most new members to join and post at least once, will win. 
    Prizes in FrogeX will be given out at the end.  More info coming soon!`,
    getInvolved:'Participate in the competition when it is announced officially. ',
    sizeRating:2,
    progress:25,
    tasks:[
      'Research how to track tg adds / buys off a link click',
      'Having funds on hand to give out FrogeX and maybe ETH in prizes',
      'Getting enough community involvement to actually have a reasonable competition',
      'Figuring out just how invasive a link\'s datamining can be without actually being illegal',
    ],
  },
  {
    title:'Froge NFTs',

    img:['011','040'],
    description:`While there have been some community members making Froge themed NFTs, 
      we are planning a set of Official FrogeX NFTs which will entitle the owners to 
      extra perks and special events. Please look forward to updates in this area of interest.`,
    getInvolved:`If you have unique expertise with NFTs please feel free to share with 
      the team to help us weigh options and maximize our value proposition with NFTs.`,
    sizeRating:3,
    progress:10,
    tasks:[
      'R & D',
      'Setting up the artwork',
      'Setting up the minting site',
      'Launch on Opensea',
    ],
  },
  {
    title:'Froge Lounge',

    img:['016','045'],
    description:`A digital space hosted by us where people can meet and 
    discuss both FrogeX and environmental causes. Featuring films by 
    David Attenborough, Steve Irwin and other influential nature personalities. 
    This will be a chill place to hang out with fellow FrogeX holders 
    and interact with the team in a quiet setting.`,
    getInvolved:'Please look forward to updates!',
    sizeRating:21,
    progress:5,
    tasks:[
      'Determine approach, scope, and prioritization',
      'Development',
      'chill in the lounge!',
    ],
  },
]

export const froadmapData_dev_siteAndDApp = [
  {
    title:'Fiat Onboarding',

    img:['001','030'],
    description:`We will partner with a fiat onboarding service to allow people to 
      directly purchase FrogeX with their VISA or Debit cards, right within our dApp!`,
    getInvolved:`If you know any good services or have a point of contact 
      at any fiat onboarders please contact the team.`,
    sizeRating:3,
    progress:33,
    tasks:['design', 'implement', 'test', 'release',],
  },
  {
    title:'Anon Suggestion Box',
    img:['018','047'],
    description:'A form on our website for anonymously suggesting changes and or fixes for the project.',
    getInvolved:'Once the box is up leave us a message. We always love hearing from our community!',
    sizeRating:2,
    progress:25,
    tasks:['design', 'implement', 'test', 'release',],
  },
  {
    title:'AutoMode FrogeX Market Widget',
    img:['018','047'],
    description:`At the push of a couple buttons through the dapp, the widget connects to uniswap 
      to initiate a transaction with the user defined number of tokens for the desired buy/sell 
      of FrogeX via ETH with slippage automatically set at 8%. This makes transacting 
      on the uniswap DEX more simple with FrogeX.`,
    getInvolved:'',
    sizeRating:5,
    progress:0,
    tasks:['design', 'implement', 'test', 'release',],
  },
]

export const froadmapData_admin_general = [
  {
    title:'Establish the Froge Foundation',

    img:['002','031'],
    description:`Froge Finance with establish a charitable foundation which directly works 
    with other charitable organizations to effectively use the funds generated from FrogeX 
    and other Froge Finance Tokens to save the planet and heal our environment.`,
    getInvolved:'',
    sizeRating:5,
    progress:100,
    tasks:[
      'Incorporate Foundation',
      'Set up Foundation website',
      'Setup Donation Charter',
      'Seek publicity for the Foundation',
    ],
  },
  {
    title:'Montel Williams: The FrogeX Fighter',

    img:['004','033'],
    description:`Froge Finance will sponsor Montel Williams, an up and coming MMA fighter 
    with a passion for cryptocurrency and our green mission. This will result in greater 
    visibility of our token in and around the octagon. MMA has become a sport that 
    many crypto enthusiasts pay close attention to and we're happy to have such a 
    close relationship with Montel and his coaching team.`,
    getInvolved:'',
    sizeRating:3,
    progress:55,
    tasks:[
      'Sponsoring Montel',
      'Having PR events like AMAs and Meetups with Montel',
      'Arranging Watch Parties for Fights Montel is in',
    ],
  },
  {
    title:'FrogeX Eco-Investment Portfolio',

    img:['005','034'],
    description:`This would be an addition to our Hybrid Eco-DEX where fiat users could 
      put money into a managed portfolio of Eco-Defi coins that will not only save the 
      planet but generate a nice amount of dividend income between 3-6% Quarterly. 
      This would be a good option for those who are Eco-Conscious and understand the 
      power of Cryptocurrency but lack the time/knowledge to invest on their own`,
    getInvolved:`If you have a good understanding of investments or experience in 
      sustainable investing please feel free to contact us with your suggestions 
      for investments or strategies.`,
    sizeRating:3,
    progress:33,
    tasks:[
      'Creating a separate Legal Entity for this kind of business',
      'Gaining the regulatory approval to act as a management fund',
      'Marketing our new service to Older and Busier clienteles',
    ],
  },
  {
    title:'CoinMarketCap listing',

    img:['007','036'],
    description:`CoinMarketCap is the premier cryptocurrency tracking service. 
      We will submit to and list FrogeX with their service to improve visibility for our project.`,
    getInvolved:'',
    sizeRating:2,
    progress:100,
    tasks:[
      'File application',
      'EXTDEP: Listing Occurs',
      'Retract the v1 Froge Finance page',
    ],
  },
  {
    title:'CoinGecko listing',

    img:['007','036'],
    description:`CoinGecko is a tracking and databasing service used by dozens of 
      wallets and websites. We will submit to and list FrogeX with their service 
      to both improve visibility for our project and allow prices to be 
      shown in holders' wallets.`,
    getInvolved:'',
    sizeRating:2,
    progress:100,
    tasks:[
      'File application',
      'EXTDEP: Listing Occurs',
      'Retract the v1 Froge Finance page',
    ],
  },
  {
    title:'FrogeX In-Office',

    img:['012','041'],
    description:`Using Marketing and/or Charity funds FrogeX would back local and 
      state level politicians in the US and other countries to push Eco-conscious 
      and Transparency agendas. Targeted offices would be Mayors, Treasurers, 
      Attorney Generals, Comptrollers, Governors, Local and State Assemblypersons, 
      and any other position that might have sway over ecologic decisions`,
    getInvolved:`If you hold a position in public office, work in politics or have 
      political connections please reach out to us to help us network with these 
      potential partners and organizations to expand our positive environmental 
      impact into the public sphere!`,
    getInvolved2:`If you are or know a political candidate or currently seated political 
      representative who would be interested in working with us to further our goals of 
      environmental stewardship and the proliferation of cryptocurrencies please contact the team.`,
    sizeRating:8,
    progress:5,
    tasks:[
      'Choosing existing candidates or inspiring new candidates',
      'Financially and Tangibly backing their bids for office',
      'Preparing tactical plans for the candidates to use when running',
      'Preparing agendas and networking the candidates with other candidates who are either backed by us or share similar goals',
    ],
  },
  {
    title:'Game Nights with FrogeX',

    img:['013','042'],
    description:`Having fun is the best part of having a great community! 
      We will be hosting all-inclusive game nights and other mystery events you won't want to miss!`,
    getInvolved:`Join in when a game night is announced and have fun!  
      Also please message with any ideas/suggestions!`,
    sizeRating:2,
    progress:50,
    tasks:[
      'Establish a host',
      'Set a time',
      'Help host with content/games ideas',
      'Attend and have fun!',
    ],
  },
  {
    title:'"A Froge Dream" Production',

    img:['014','043'],
    description:`This will be a video documentary depicting the impact Froge Finance 
      and FrogeX have had through the lens of a person's inspirational journey to save the environment.`,
    getInvolved:`If you are or know a filmmaker or anyone who works in the film 
      industry who is interested in producing this documentary please contact the team.`,
    sizeRating:13,
    progress:0,
    tasks:[
      'Make a storyboard',
      'Write dialog/content',
      'Secure funding for artist',
      'Find artist to work with',
      'Watch together!',
    ],
  },
  {
    title:'X Games Sponsorship',

    img:['015','044'],
    description:'We will Frogeify an athlete for the coming X Games!',
    getInvolved:`If you are involved in X games sponsorship or as an 
    athlete and have ideas to help us make the dream of FrogeX X games 
    sponsorship a reality, please reach out to us with opportunities or suggestions!`,
    sizeRating:3,
    progress:15,
    tasks:[
      'Research: How to sponsor',
      'Establish contact & build a relationship',
      'Secure & deliver funding',
      'Watch together!',
    ],
  },
]

const offRecordOnDeck = [
  {
    title:'Hybrid Eco-DEX',
    img:['003','032'],
    description:`The creation of a Decentralized Exchange with in-built fiat 
      onboarding and offboarding that operates via a layer 2 abstraction to 
      save gas and gives a portion of the fees collected to Eco-Charities and 
      other Environmental Causes. This would operate using the Uniswap liquidity 
      pools for any tokens listed rather than establishing new pools`,
    getInvolved:'',
    sizeRating:21,
    progress:25,
    tasks:[
      'Establish a reliable means of onboarding and offboarding Crypto to and from Fiat',
      'Establish or Adopt a Layer 2 solution which allows for extreme gas savings',
      'Create a governance body for the Exchange',
      'File any requisite paperwork to get the Exchange legally recognized',
      'Link with existing Uniswap Liquidity pools',
    ],
  },
  {
    title:'TwitterBot',

    img:['003','032'],
    description:`idea of a twitter bot that would maybe seek out our tag and 
    either tally up how many times it was mentioned, or provide links to 
    the tweets, or whatever else we want it to do. The possibilities are really endless.`,
    getInvolved:'',
    sizeRating:3,
    progress:25,
    tasks:[
      '',
    ],
  },
  {
    title:'FrogeX as Currency on Digital Platforms',

    img:['006','035'],
    description:`We convince gaming and merchant platforms to accept and use 
      FrogeX as currency. Platforms like Steam, Amazon, Ebay, Humble Bundle, 
      and smaller retail groups could be convinced based on the 
      Eco-conscious nature and the ETH rewards function of FrogeX`,
    getInvolved:'',
    sizeRating:3,
    progress:77,
    tasks:[
      'Making business relationships with retailers',
      'Demonstrating the ease of use and potential gains for doing so',
      'Creating a Layer 2 business platform or using an existing one like Kranz',
    ],
  },
]

export const aboutSize = [
  `"Size" means "Estimate of work-hours".`,
  `Size units follow the fibbonaci sequence (1,2,3,5,8,13,21)`,
  `1 size unit = "1 day of actual work" = "6 hours of actual work"`,
  `1 size unit does NOT mean it will take 1 day.`,
  `1 size unit just means "6 hours of work".`,
  `Work hours can be impeded by what is termed "blockers"`,
  `"Blockers" can be internal or external.`,
  `Internal Blocker Example: 1 task is dependent on another task - they must be carried out in succession.`,
  `External Blocker Example: A task is dependent on action from an external team.`,
  `So, a size of 1 can mean "knock it out in an afternoon", or it can mean "this is a small workload"`,
  `Typically, sizes of 13, 21, and greater, are discouraged,
      because if a set of tasks get to be that large 
      then a breakdown into smaller parts is appropriate.`,
  `For a better browsing experience, our froadmap displays ideas of greater size.`,
  `Now you know about "size". :)`
]
