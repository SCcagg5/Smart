/* eslint-disable comma-dangle */
export const cashArray = [
  {
    id: 0,
    icon:
      'https://theme.zdassets.com/theme_assets/586236/49e4904c4910a8ebf63b67d41f9b98b6b0933275.png',
    title: 'WEALTHFRONT',
    text: 'Personal Savings',
    money: '$9,275'
  },
  {
    id: 1,
    icon:
      'https://static1.squarespace.com/static/5634e954e4b0f9cec0c16373/t/5bcc7f24085229820cd48c9e/1540128588808/Bofa-logo.jpg',
    title: 'BANK OF AMERICA',
    text: 'BofA Checkings',
    money: '$12,030'
  },
  {
    id: 2,
    icon:
      'https://c93fea60bb98e121740fc38ff31162a8.s3.amazonaws.com/wp-content/uploads/2017/04/robinhood.jpg',
    title: 'ROBINHOOD',
    text: 'Robinhood Cash',
    money: '$7,123'
  },
  {
    id: 3,
    icon:
      'https://assets.coingecko.com/markets/images/23/large/fe290a14-ac8f-4c90-9aed-5e72abf271f0.jpeg?1527171545',
    title: 'COINBASE PRO',
    text: 'Coinbase USD',
    money: '$15,712'
  },
  {
    id: 4,
    icon:
      'https://static1.squarespace.com/static/5634e954e4b0f9cec0c16373/t/5bcc7f24085229820cd48c9e/1540128588808/Bofa-logo.jpg',
    title: 'BANK OF AMERICA',
    text: 'BofA Checkings',
    money: '$12,030'
  }
];

export const investmentsArray = [
  {
    id: 0,
    icon:
      'https://theme.zdassets.com/theme_assets/586236/49e4904c4910a8ebf63b67d41f9b98b6b0933275.png',
    title: 'WEALTHFRONT',
    text: 'Personal Savings',
    money: '$9,875'
  },
  {
    id: 1,
    icon:
      'https://static1.squarespace.com/static/5634e954e4b0f9cec0c16373/t/5bcc7f24085229820cd48c9e/1540128588808/Bofa-logo.jpg',
    title: 'BANK OF AMERICA',
    text: 'BofA Checkings',
    money: '$12,030'
  },
  {
    id: 2,
    icon:
      'https://assets.coingecko.com/markets/images/23/large/fe290a14-ac8f-4c90-9aed-5e72abf271f0.jpeg?1527171545',
    title: 'COINBASE PRO',
    text: 'Personal Crypto',
    money: '$15,030'
  },
  {
    id: 3,
    icon:
      'https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/e5/b4/12/e5b412b9-e3e6-2656-f68b-cff004ab695c/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-9.png/246x0w.jpg',
    title: 'Fidelity',
    text: '401(K)',
    money: '$12,030'
  },
  {
    id: 4,
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Charles_Schwab_Corporation_logo.svg/220px-Charles_Schwab_Corporation_logo.svg.png',
    title: 'CHARLES SCHWAB',
    text: '231 Brokerage',
    money: '$42,130'
  }
];

export const liabilitiesArray = [
  {
    id: 0,
    icon:
      'https://static1.squarespace.com/static/5634e954e4b0f9cec0c16373/t/5bcc7f24085229820cd48c9e/1540128588808/Bofa-logo.jpg',
    title: 'BANK OF AMERICA',
    text: 'Travel Credit Card',
    money: '$1,200'
  },
  {
    id: 1,
    icon:
      'https://blockchainstocks.com/wp-content/uploads/2018/08/American-Express_Pentagram_Boteco-Design_04-696x522.jpg',
    title: 'AMERICAN EXPRESS',
    text: 'American Express basic',
    money: '$500'
  },
  {
    id: 2,
    icon: 'https://uponarriving.com/wp-content/uploads/2016/02/Chase-Logo-300x270.png',
    title: 'CHASE BANK',
    text: 'Money Bank',
    money: '$2,130'
  }
];

export const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  backgroundColor: 'white',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(249, 105, 14, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  style: {
    borderRadius: 0
  }
};

// second style for chart
export const lineChartData = [
  [4000, 1900, 3200, 1500, 5200, 5500, 2000, 6000, 7000, 4000, 5600],
  [1000, 2005, 4400, 2000, 3000, 5500],
  [4000, 1009, 3200, 1500, 5200, 55, 20, 60, 78, 42, 56],
  [10, 30, 10, 50, 10, 50, 20, 60, 78, 50, 40],
  [1000, 2500, 4400, 2000, 3000, 5500],
  [4000, 1900, 3200, 1500, 5200, 5500, 2000, 6000, 7800, 4200, 5600]
];

export const lineChartTables = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export const lineChartConfig = {
  interpolation: 'spline',
  area: {
    gradientFrom: 'orange',
    gradientFromOpacity: 1,
    gradientTo: 'orange',
    gradientToOpacity: 0.4
  },
  tooltip: {
    visible: true,
    labelFontSize: 10
  },
  line: {
    strokeColor: 'orange',
    strokeWidth: 2
  },
  insetY: 10,
  insetX: 10,
  grid: { visible: false },
  yAxis: {
    visible: true,
    labelFormatter: v => '$' + String(v.toFixed())
  }
};

export const expensesData = [
  {
    name: 'Drinks',
    money: 1280,
    color: '#ff8e9c',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Rent',
    money: 2005,
    color: '#229ff6',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Groceries',
    money: 1500,
    color: '#9ed764',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Uber',
    money: 800,
    color: '#ffd38d',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Restaurants',
    money: 965,
    color: '#ff8711',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  }
];

export const spendingArray = [
  {
    id: 0,
    icon:
      'https://www.instamobile.io/wp-content/uploads/2019/03/Screen-Shot-2019-03-27-at-10.02.12-PM.png',
    title: 'HOME & UTILITIES',
    money: '$1,200 spent'
  },
  {
    id: 1,
    icon:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tbiIUHkvzkHaMH4vC2h-ifNgo2IxGxq5pjZ8_kuoXJKqpPbBHA',
    title: 'TRAVEL',
    money: '$500 spent'
  },
  {
    id: 2,
    icon:
      'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F312644%252FUber_Logobit_Digital_black.png%252F950x534__filters%253Aquality%252890%2529.png?signature=EovGBFsXq2bCP9auiawtB-cJKVY=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
    title: 'RIDE SHARING',
    money: '$430 spent'
  },
  {
    id: 2,
    icon:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFRaXksljpUSIJWBcxVMPnPFY0pqHiNaORIBW_CXghyVIjYvbmvg',
    title: 'DRINK',
    money: '$132 spent'
  },
  {
    id: 2,
    icon:
      'https://www.instamobile.io/wp-content/uploads/2019/03/Screen-Shot-2019-03-27-at-10.02.54-PM.png',
    title: 'GROCERIES',
    money: '$2,730 spent'
  },
  {
    id: 2,
    icon:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49JG1ISq63JuSM_-WKjag4Mb018qXbgAqutn63s7yGjILtk3O',
    title: 'RENT',
    money: '$1,860 spent'
  }
];

export const portfolioData = [
  {
    name: 'Real Estate',
    money: 20000,
    color: '#ff8711',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Cash',
    money: 28000,
    color: '#9ed764',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Crypto',
    money: 7612,
    color: '#ffd38d',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Gold',
    money: 38000,
    color: '#229ff6',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Stocks',
    money: 25000,
    color: '#dba0d5',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  },
  {
    name: 'Bonds',
    money: 40000,
    color: '#ff8e9c',
    legendFontColor: '#2d65c9',
    legendFontSize: 12
  }
];

export const storiesArray = [
  {
    id: 0,
    title: 'Why the worst may already be over for the global economy ',
    date: 'Boomerberg - 9 hours ago',
    url: 'https://www.bloomberg.com/europe'
  },
  {
    id: 1,
    title: 'Boeing ended the week worth $25 bilion less than it started',
    date: 'Quartz - one day ago',
    url: 'https://www.bloomberg.com/europe'
  },
  {
    id: 2,
    title: 'Better economic data needed before Wall Street can rise back to all time highest',
    date: 'CNBC - 3 days ago',
    url: 'https://www.bloomberg.com/europe'
  },
  {
    id: 3,
    title: 'Apple Watch detects irregular heart beat in large U.S study',
    date: 'Reuters - 3 days ago',
    url: 'https://www.bloomberg.com/europe'
  },
  {
    id: 4,
    title: 'Trump urges General Motors to reopen Ohio plant in tweet',
    date: 'Reuters - 12 days ago',
    url: 'https://www.bloomberg.com/europe'
  }
];

export const accounts = [
  {
    id: 0,
    icon: 'https://uponarriving.com/wp-content/uploads/2017/11/CapitalOne.png',
    title: 'Capital One',
    text: 'Capital One',
    money: '$1,2875',
    payments: [
      {
        id: 0,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Proper SF Hotel San Francisco',
        money: '$55.00',
        date: 'Mar 30'
      },
      {
        id: 1,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'The Grind Cafe San Francisco',
        money: '$26.39',
        date: 'Mar 30'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Payment Received - Mark Cuban',
        money: '$14.99',
        date: 'Mar 29'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Prime Video *MW30C9AK',
        money: '$15.99',
        date: 'Mar 28'
      }
    ]
  },
  {
    id: 1,
    icon:
      'https://img1-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/21703/large_thumb_placeit__15_.jpg',
    title: 'Real Estate',
    text: 'Real estate',
    money: '$19,275',
    payments: [
      {
        id: 0,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Proper SF Hotel San Francisco',
        money: '$55.00',
        date: 'Mar 30'
      },
      {
        id: 1,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'The Grind Cafe San Francisco',
        money: '$26.39',
        date: 'Mar 30'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Payment Received - Mark Cuban',
        money: '$14.99',
        date: 'Mar 29'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Prime Video *MW30C9AK',
        money: '$15.99',
        date: 'Mar 28'
      }
    ]
  },
  {
    id: 2,
    icon:
      'https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/e5/b4/12/e5b412b9-e3e6-2656-f68b-cff004ab695c/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-9.png/246x0w.jpg',
    title: 'Net Benefits',
    text: 'Net Benefits',
    money: '$9,275',
    payments: [
      {
        id: 0,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Proper SF Hotel San Francisco',
        money: '$55.00',
        date: 'Mar 30'
      },
      {
        id: 1,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'The Grind Cafe San Francisco',
        money: '$26.39',
        date: 'Mar 30'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Payment Received - Mark Cuban',
        money: '$14.99',
        date: 'Mar 29'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Prime Video *MW30C9AK',
        money: '$15.99',
        date: 'Mar 28'
      }
    ]
  },
  {
    id: 3,
    icon: 'https://pbs.twimg.com/profile_images/762644570568024064/Az3Nca2s_400x400.jpg',
    title: 'Financial',
    text: 'Financial',
    money: '$9,275',
    payments: [
      {
        id: 0,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Proper SF Hotel San Francisco',
        money: '$55.00',
        date: 'Mar 30'
      },
      {
        id: 1,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'The Grind Cafe San Francisco',
        money: '$26.39',
        date: 'Mar 30'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Payment Received - Mark Cuban',
        money: '$14.99',
        date: 'Mar 29'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Prime Video *MW30C9AK',
        money: '$15.99',
        date: 'Mar 28'
      }
    ]
  },
  {
    id: 4,
    icon: 'https://www.wfae.org/sites/wfae/files/styles/x_large/public/201901/wells-logo.jpg',
    title: 'Wells Fargo Bank',
    text: 'Wells Fargo Bank',
    money: '$25,775',
    payments: [
      {
        id: 0,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Proper SF Hotel San Francisco',
        money: '$55.00',
        date: 'Mar 30'
      },
      {
        id: 1,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'The Grind Cafe San Francisco',
        money: '$26.39',
        date: 'Mar 30'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Payment Received - Mark Cuban',
        money: '$14.99',
        date: 'Mar 29'
      },
      {
        id: 2,
        icon: 'https://img.icons8.com/cotton/2x/online-store.png',
        name: 'Prime Video *MW30C9AK',
        money: '$15.99',
        date: 'Mar 28'
      }
    ]
  }
];

export const payments = [
  {
    id: 0,
    icon: 'https://img.icons8.com/cotton/2x/online-store.png',
    name: 'Proper SF Hotel San Francisco',
    money: '$55.00',
    date: 'Mar 30'
  },
  {
    id: 1,
    icon: 'https://img.icons8.com/cotton/2x/online-store.png',
    name: 'The Grind Cafe San Francisco',
    money: '$26.39',
    date: 'Mar 30'
  },
  {
    id: 2,
    icon: 'https://img.icons8.com/cotton/2x/online-store.png',
    name: 'Payment Received - Mark Cuban',
    money: '$14.99',
    date: 'Mar 29'
  },
  {
    id: 2,
    icon: 'https://img.icons8.com/cotton/2x/online-store.png',
    name: 'Prime Video *MW30C9AK',
    money: '$15.99',
    date: 'Mar 28'
  }
];
