module.exports = {
    getTenantAndLoginType(path) {
        let a = path.match(/-(.*?)-/g)
        let logintype = ''
        let tenant = ''
        if (a[0]) {
            logintype = a[0].replace(/-/g, '')
        }
        if (a[1]) {
            tenant = a[1].replace(/-/g, '')
        }
        return [logintype, tenant]
    },
}
