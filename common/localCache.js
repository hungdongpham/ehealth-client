/*** User list local cache
*/

var users=[
	{
		role: "admin",
		username: "thanhtam",
		password: "aaaaaa"
	},
	{
		role: "doctor",
		username: "hieutri",
		password: "aaaaaa"
	},
	{
		role: "patient",
		username: "hungnguyen",
		password: "aaaaaa"
	},
];

exports.addUser = function(new_user){
	console.log("add user");
	users.push(new_user);
	exports.users = users;
}

exports.getListUsers = () => users;

