import { ObjectId } from "mongodb";

class Clip {
	constructor(title, description, url, user_id) {
		this.title = title;
		this.description = description;
		this.url = url;
		this.user_id = ObjectId(user_id);
		this.created_at = new Date();
	}
}

module.exports = Clip;
