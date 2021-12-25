export default class Builder {
    constructor () {
        this._id = '';
        this.id = '';
        this.dispatch_date = '';
        this.arrival_date = '';
        this.source = '';
        this.destination = '';
        this.railcar_type = '';
        this.seat = '';
        this.railcar_num = '';
        this.train_id = '';
        this.price = '';
    }

    reset() {
        this._id = '';
        this.id = '';
        this.dispatch_date = '';
        this.arrival_date = '';
        this.source = '';
        this.destination = '';
        this.railcar_type = '';
        this.seat = '';
        this.railcar_num = '';
        this.train_id = '';
        this.price = '';
    }

    set_id = (_id) => this._id = _id; 
    setId = (id) => this.id = id;
    setDispatchDate = (dispatch_date) => this.dispatch_date = dispatch_date;
    setArrivalDate = (arrival_date) => this.arrival_date = arrival_date;
    setSource = (source) => this.source = source;
    setDestination = (destination) => this.destination = destination;
    setRaicarType = (railcar_type) => this.railcar_type = railcar_type;
    setSeat = (seat) => this.seat = seat;
    setRailcarNum = (railcar_num) => this.railcar_num = railcar_num;
    setTrainId = (train_id) => this.train_id = train_id;
    setPrice = (price) => this.price = price;

    get_id = () => this._id;
    getId = () => this.id;
    getDispatchDate = () => this.dispatch_date;
    getArrivalDate = () => this.arrival_date;
    getSource = () => this.source;
    getDestination = () => this.destination;
    getRaicarType = () => this.railcar_type;
    getSeat = () => this.seat;
    getRailcarNum = () => this.railcar_num;
    getTrainId = () => this.train_id;
    getPrice = () => this.price;

    getFilterData() {
        return {
            dispatch_date: this.dispatch_date,
            arrival_date: this.arrival_date,
            source: this.source,
            destination: this.destination,
            railcar_type: this.railcar_type
        }
    }

    getTicket() {
        return {
            _id: this._id,
            id: this.id,
            train_id: this.train_id,
            railcar_num: this.railcar_num,
            railcar_type: this.railcar_type,
            seat: this.seat,
            dispatch_date: this.dispatch_date,
            arrival_date: this.arrival_date,
            source: this.source,
            destination: this.destination,
            price: this.price
        }
    }
}