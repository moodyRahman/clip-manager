import { ObjectId } from "mongodb";

class User {
	constructor(username, email, clips_id) {
		this.username = username;
		this.email = email;
		this.clips_id = clips_id.map((id) => ObjectId(id));
		this.created_at = new Date();
	}
}

module.exports = User;
