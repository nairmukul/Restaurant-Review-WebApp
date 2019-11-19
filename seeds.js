var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')
var data = [
    {
        name:"Clouds Rest",
        image:"https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg",
        description:'"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"\n' +
            '\n'
    },
    {
        name:"Camp Fire",
        image:"https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg",
        description:'"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"\n' +
            '\n'
    },
    {
        name:"Camp Tent",
        image:"https://www.wrs.com.sg/content/dam/wrs/singapore-zoo/schools-and-groups/img_f_overnight_camps_singapore_zoo.jpg",
        description:'"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"\n' +
            '\n'
    },

];

function seedDB() {

    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if(err){
            console.log(err)
        }else {
            console.log('Removed Campgrounds');


            //Add a few Campgrounds
            data.forEach(function (seeds) {
                Campground.create(seeds, function (err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Added Campground')

                        //Create Comments
                        Comment.create({
                            text:'This place is great, but I wish there was internet.',
                            author:'Homer'
                        },function (err,comment) {
                            if(err){
                                console.log(err)
                            }else {
                                campground.comments.push(comment);
                                campground.save()
                            }
                        });

                    }
                })
            });
        }

    });

}

module.exports = seedDB;

