ùimport { prisma } from './src/lib/prisma'

async function main() {
    try {
        const users = await prisma.user.findMany()
        console.log('Users:', users)
    } catch (e) {
        console.error('DB Error:', e)
    }
}

main()
ù*cascade082file:///c:/quiz/test-db.ts