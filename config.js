const env = process.env;

const config = {
  port: env.PORT || 8080,

  itemsPerPage: env.ITEMS_PER_PAGE || 10000,

  dbFileName: "acronymsANDgolinks.db"
}

module.exports = config;