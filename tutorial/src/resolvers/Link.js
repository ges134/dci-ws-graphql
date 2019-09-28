const postedBy = (parent, args, context) => context.prisma.link({
  id: parent.id
}).postedBy()

const votes = (parent, args, context) => context.prisma.link({
  id: parent.id
}).vote()

module.exports = {
  postedBy,
  votes
}