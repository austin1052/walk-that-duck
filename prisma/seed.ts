import { PrismaClient } from '@prisma/client'
import { queenData, ranks, ranks2 } from '../test-data'

const prisma = new PrismaClient()

async function main() {
  await prisma.queen_team.deleteMany({})
  await prisma.team.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.queen.deleteMany({})


  await prisma.user.create({
    data: {
      name: 'Austin',
    },
  })
  await prisma.user.create({
    data: {
      name: 'Emily',
    },
  })

  queenData.forEach(async (queen) => {
    await prisma.queen.create({
       data: {
         id: queen.id,
         name: queen.name,
         active: queen.active
       },
     })
  })

  const user = await prisma.user.findFirst({
    where: { name: 'Austin' },
  })

  const user2 = await prisma.user.findFirst({
    where: { name: 'Emily' },
  })

let team: any, team2: any, team3: any, team4: any;
if (user) {
  team = await prisma.team.create({
    data: {
      week: 1,
      userId: user.id
    }
  })
  team2 = await prisma.team.create({
    data: {
      week: 2,
      userId: user.id
    }
  })
}
if (user2) {
  team3 = await prisma.team.create({
    data: {
      week: 1,
      userId: user2.id
    }
  })
  team4 = await prisma.team.create({
    data: {
      week: 2,
      userId: user2.id
    }
  })
}

if (team) {
  ranks.forEach(async (queen) => {
    await prisma.queen_team.create({
      data: {
        queenId: queen.id,
        teamId: team.id,
        placement: queen.placement
      }
    })
  })
  ranks2.forEach(async (queen) => {
    await prisma.queen_team.create({
      data: {
        queenId: queen.id,
        teamId: team2.id,
        placement: queen.placement
      }
    })
  })
  ranks.forEach(async (queen) => {
    await prisma.queen_team.create({
      data: {
        queenId: queen.id,
        teamId: team3.id,
        placement: queen.placement
      }
    })
  })
  ranks2.forEach(async (queen) => {
    await prisma.queen_team.create({
      data: {
        queenId: queen.id,
        teamId: team4.id,
        placement: queen.placement
      }
    })
  })
}
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })