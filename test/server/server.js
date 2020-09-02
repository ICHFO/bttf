const expect = require('chai').expect;
const fetch = require('node-fetch')
const {By, until, Builder, Key} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

describe("Routes", function () {
    const url = "http://localhost:3000"

    describe("/", function () {
        const reqOpts = {method: 'get'}

        it('should return status 200', function (done) {
            fetch(url + '/', reqOpts)
                .then(function (res) {
                    expect(res.status).to.equal(200)
                    done()
                })
        })


        it('should return the Home hmtl page', function (done) {
            this.timeout(10000)
            const options = new firefox.Options().addArguments('--headless')
            let driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

            driver.get(url)
                .then(function () {
                    driver.getTitle()
                        .then(function (title) {
                            expect(title).to.equal('BTTF')
                            done()
                        })
                        .finally(() => driver.quit())
                })
        });
    })

    describe("/overview", function () {
        const apiPath = "/overview"
        const reqOpts = {method: 'get'}

        it('should return status 200', function (done) {
            fetch(url + apiPath, reqOpts)
                .then(function (res) {
                    expect(res.status).to.equal(200)
                    done()
                })
        })
    })

    describe("/detail", function () {
        const apiPath = "/detail"
        const body = {
            ts: "2020-08-24 21:46:00.000000",
            text: "select customer_id, balance from icws.account"
        }
        const reqOpts = {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }

        it('should return status 200', function (done) {
            fetch(url + apiPath, reqOpts)
                .then(function (res) {
                    expect(res.status).to.equal(200)
                    done()
                })
        })
    })

    describe('/userIds', function () {
        const apiPath = '/userIds'
        const reqOpts = {method: 'get'}

        it('should return status 200', function (done) {
            fetch(url + apiPath, reqOpts)
                .then(function (res) {
                    expect(res.status).to.equal(200)
                    done()
                })
        })

        it('should return array', function (done) {
            fetch(url + apiPath, reqOpts)
                .then(res => res.json())
                .then(function (res) {
                    expect(Array.isArray(res)).to.equal(true)
                    done()
                })
        })
    })
})
