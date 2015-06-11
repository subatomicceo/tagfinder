Meteor.methods({
    /*
        Method: findTags,
        Type: Private,
        params: word (String) word to search for
        returns: hashtags (array)
     */
    findTags: function(word) {
        // defaults
        var Twitter = Meteor.npmRequire('twitter'), //init npm twitter 
            query = '#' + word, // build query string
            T = new Twitter({ //create new twitter obj with secret keys
                consumer_key: 'JB6EkWlkcVALXtHyh8UKGUX8b',
                consumer_secret: '0HE1wBvdx5o5J4AP99DyxJG3xUeF8XJqttfUSliNrPsuM9Tgwp',
                access_token_key: '1656109980-MTqzBE3Iqhg4H2mKH3BFEaQ9t3IYgesU0qir8II',
                access_token_secret: 'epVTskdaoPltsyoK9BbCmCnkiYdAh0ph6gRJt9m1MW5V7'
            }),
            wrapGet = Meteor.wrapAsync(T.get, T), //wrap async callback in Meteor.wrapAsync() to allow return
            response = wrapGet('search/tweets', { //fire get request
                q: query
            }),
            hashtags = []; //create empty array for hashtags

        // loop through response object
        _.forEach(response.statuses, function(tweet, key) {
            // defaults
            var text = tweet.text,
                tags = text.match(/#[\w]+(?=\s|$)/g); //seperate multiple tags in a single string into array

            // loop through tags
            _.forEach(tags, function(tag, i) {
                if (tag.indexOf(word) > 0) {
                    hashtags.push(tag);
                }
            });
        });
        return _.union(hashtags);
    },
    findRelated: function(word) {
        var SpellChecker = Meteor.npmRequire('spellchecker'),
            related = [];
        _.forEach(SpellChecker.getCorrectionsForMisspelling(word), function(word, key) {
            related.push(word);
        });
        return related;
    }
});