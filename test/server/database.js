const expect = require('chai').expect;
const ibmdb = require('ibm_db');
const db = require('../../src/server/database')

const cfg = require('../../src/config.json')

describe('Database', function () {
    const cn = cfg.database.cn
    const cnopts = cfg.database.cnopts

    it('should be availabe', function (done) {
        ibmdb.open(cn, cnopts, function (err, conn) {
            expect(conn.connected).to.equal(true)
            done()
        })
    })

    describe("Queries", function () {

        describe("Overview", function () {
            it('should return a non empty Array', function (done) {
                db.getQueries(function (data) {
                    expect(Array.isArray(data)).to.equal(true);
                    expect(data.length).to.not.equal(0);
                    done();
                })
            })
        })

        describe("History", function () {
            it('should return a non empty Array', function (done) {
                const ts = "2020-08-24 21:46:00.000000";
                const text = "select customer_id, balance from icws.account";

                db.historyQuery(ts, text, function (data) {
                    expect(Array.isArray(data)).to.equal(true)
                    expect(data.lenght).to.not.equal(0)
                    done();
                })
            })
        })
    })
})
