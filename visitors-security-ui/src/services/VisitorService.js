import axios from 'axios';

const VISITOR_API_BASE_URL = "http://localhost:8080/springboot-crud-rest/api/v1/visitors";

class VisitorService {

    getVsitors() {
        return axios.get(VISITOR_API_BASE_URL);
    }

    createVisitor(visitor) {
        return axios.post(VISITOR_API_BASE_URL, visitor);
    }

    getVisitorById(visitorId) {
        return axios.get(VISITOR_API_BASE_URL + '/' + visitorId);
    }
}

export default new VisitorService()