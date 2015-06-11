Template.home.helpers({
		tags: function() {
				return Session.get('tags');
		}
});

Template.home.events({
		'keyup .word': function(e, t) {
				var word = t.$('.word').val(),
						$error = t.$('.error'),
						$label = t.$('.input-label');
				if (word) {
						Meteor.call('findTags', word, function(err, res) {
								if (err) {
										console.log(err);
										return;
								}
								if (res[0]) {
										$label.show();
										$error.hide();
										Session.set('tags', res);
								} else {
										Meteor.call('findRelated', word, function(err, res) {
												if (err) {
														console.log(err);
														return;
												}
												$error.show();
												$label.hide();
												Session.set('tags', res);
										});
								}
						});
				}
		}
});