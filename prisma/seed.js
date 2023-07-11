const { PrismaClient } = require('@prisma/client');
const { validateHeaderValue } = require('http');

const prisma = new PrismaClient();

const seedData = [
    {
        name: 'Junior Level Books Introduction to Computer ',
        Author:'Amit Garg',
        Publisher: 'Readers Zone',
    },
    {
        name:'Publish News Letter ',
        Author:'Amit Garg',
        Publisher:'MCA Department, MIET Meerut',
    },
    {
        name:'Client Server Computing',
        Author:'Lalit Kumar',
        Publisher:'Sun India Publications, New Delhi ',
    },
    {
        name:'Mobile Computing ',
        Author:'Vinay Kumar Singhal ',
        Publisher:'K Nath & Sons, Meerut',
    },
    {
        name:'Data Structure Using C',
        Author:'Sharad Kumar Verma',
        Publisher:'Thakur Publications Lucknow',
    },
    {
        name:'Client Server Computing',
        Author:'Sharad Kumar Verma',
        Publisher:'Sun India Publications, New Delhi ',
    },
    {
        name:'Computer Networks ',
        Author:'Sharad Kumar Verma',
        Publisher:'Sun India Publications, New Delhi ',
    },
    {
        name:'.NET Framework & C# ',
        Author:'Sharad Kumar Verma',
        Publisher:'Sun India Publications, New Delhi ',
    },
    {
        name:'CBOT',
        Author:'Gunjan Verma',
        Publisher:'Thakur Publications ',
    }

    ];


async function createTempData() {
  console.log(
    'Seeding',
    seedData.map((oi) => oi.name),
    seedData.map((oi) => oi.Author),
    seedData.map((oi) => oi.Publisher),
  );
  // const res = await prisma.faculty.createMany({
  //   data: seedData.map((oi) => ({ name: oi.name , course:oi.Course})),
  // });

  for (let i = 0; i < seedData.length; i++) {
    const res = await prisma.book.createMany({
      data: {
        id: `${Math.floor(Math.random() * 10e14)}`,
        name: seedData[i].name,
        author: seedData[i].Author,
        publisher: seedData[i].Publisher
      }
    })
  }
//   console.log(res);
}
createTempData();
