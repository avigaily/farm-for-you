import React from 'react';
import { loadItems } from '../store/actions/itemActions.js'

import shopService from '../services/shopService'
import itemService from '../services/itemService.js'

import { ItemList } from '../cmps/ItemList'
import Reviews from '../cmps/Reviews'
import { connect } from 'react-redux';

class ShopDetails extends React.Component {

    state = {
        shop: null,
        sortBy: null,
        getReviews: false,
        isAddReview: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.loadShop()
        this.props.loadItems(id, this.state.sortBy);
    }

    loadShop = () => {
        const id = this.props.match.params.id
        shopService.getById(id)
            .then(shop => {
                console.log(shop);
                return this.setState({ shop })
            })


    }

    addReview = (reviewToAdd) => {
        console.log(reviewToAdd);
        const shop = this.state.shop
        shop.reviews.push(reviewToAdd)
        shopService.save(shop)
            .then(res => this.loadShop())
            this.setState({ isAddReview: false })

    }


    onHandleChange = (ev) => {
        const id = this.props.match.params.id
        this.props.loadItems({ searchValue: id }, ev.target.value)
    }

    getReviews = () => {
        const currentState = this.state.getReviews
        this.setState({ getReviews: !currentState });
        console.log('getting', currentState);
    }


    getAddReview = () => {
        const currentState = this.state.isAddReview
        this.setState({ isAddReview: true })

    }



    render() {
        const { shop, isAddReview } = this.state
        if (!shop) return <div>Loading....</div>

        return <section className="grid-container">
            <div className="hero-img full">
                <img className="shop-logo " src={shop.logo} />
            </div>
            <section className="">
                <div className="" style={{ backgroundImage: `url(${shop.aboutImg})` }}>
                </div>

                <div className="shop-front flex column">
                    <h2 className="shop-name">{shop.name}</h2>
                    <p className="shop-about">{shop.about}</p>
                    <p>stars!.........</p>
                </div>

                <button className="shop-details-btn msg ">Send a Message</button>
                <button className="shop-details-btn review " onClick={this.getReviews}>Reviews</button>

            </section>
            {this.state.getReviews && <Reviews isAddReview={isAddReview} getAddReview={this.getAddReview} shop={shop} addReview={this.addReview} />}
            <section className=" flex column align-center">
                <form>
                    <select className="sort" name="sort" onChange={this.onHandleChange}>
                        <option value="" >Sort By</option>
                        <option value="highToLow" >By Highest Price</option>
                        <option value="lowToHigh" >By Lowest Price</option>
                    </select>
                </form>
            </section>
                <ItemList items={this.props.items} />
           
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.item.items
    }
}

const mapDispatchToProps = {
    loadItems
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails)