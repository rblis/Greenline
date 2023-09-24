import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DasboardStyles.css'
import AddStockView from "../views/AddStockView";
import StockDetailView from "../views/StockDetailView";
import StockGraphView from "../views/StockGraphView";
import PortfolioView from "../views/PortfolioView";

DashboardPage.propTypes = {

};

function DashboardPage() {
    return (
        <div className="dashboard" >
            <StockGraphView></StockGraphView>
            <StockDetailView></StockDetailView>
            <AddStockView></AddStockView>
            <PortfolioView></PortfolioView>
        </div>
    );
}

export default DashboardPage;