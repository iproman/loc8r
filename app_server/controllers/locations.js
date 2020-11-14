/**
 * Get 'home' page
 * @param req
 * @param res
 */
const homelist = function (req, res) {
    res.render('locations-list', {title: 'Home'});
}

/**
 * Get 'Location info' page
 * @param req
 * @param res
 */
const locationInfo = function (req, res) {
    res.render('location-info', {title: 'Location info'});
}

/**
 * Get 'Add review' page
 * @param req
 * @param res
 */
const addReview = function (req, res) {
    res.render('location-review-form', {title: 'Add review'});
}


module.exports = {
    homelist,
    locationInfo,
    addReview
};
