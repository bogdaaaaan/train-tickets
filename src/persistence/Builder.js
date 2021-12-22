export default class Builder {
    reset() {
        this.id = '';
        this.dispatch_date = '';
        this.arrival_date = '';
        this.dispatch_place = '';
        this.arrival_place = '';
        this.railcar_type = '';
    }

    setId = (id) => this.id = id;
    setDispatchDate = (dispatch_date) => this.dispatch_date = dispatch_date;
    setArrivalDate = (arrival_date) => this.arrival_date = arrival_date;
    setDispatchPlace = (dispatch_place) => this.dispatch_place = dispatch_place;
    setArrivalPlace = (arrival_place) => this.arrival_place = arrival_place;
    setRaicarType = (railcar_type) => this.railcar_type = railcar_type;

    getResult() {
        return {
            id: this.id,
            dispatch_date: this.dispatch_date,
            arrival_date: this.arrival_date,
            dispatch_place: this.dispatch_place,
            arrival_place: this.arrival_place,
            railcar_type: this.railcar_type
        }
    }
}