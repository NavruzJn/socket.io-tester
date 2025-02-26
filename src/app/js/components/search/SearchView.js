/**
 * Search
 *
 * Renders url searchbar at the top
 *
 * @property {Number} activeTab id of the currently selected tab
 * @property {Object} connections all current socket connections
 * @property {Function} setUrl serUrl dispatcher
 */

import React, { Component } from 'react'

import RefreshIcon from './RefreshIcon'
import TextBar from './TextBar'
import NamespaceTextBar from './NamespaceTextBar'
import PathTextBar from './PathTextBar'
import TokenTextBar from './TokenTextBar'

class Search extends Component {

    constructor (props) {
        super(props);

        const tab = Search.getThisTab(props);

        this.state = {
            tab,
            url: tab.url || '',
            namespace: tab.namespace || '',
            path: tab.path ||'',
            token: tab.token||'',
        };

        this.changeUrl = this.changeUrl.bind(this);
        this.changeNamespace = this.changeNamespace.bind(this);
        this.changeToken = this.changeToken.bind(this);
        this.changePath = this.changePath.bind(this);
        this.setNamespaceAndUrl = this.setNamespaceAndUrl.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const tab = Search.getThisTab(nextProps);
        this.setState({
            tab,
            url: tab.url || '',
            namespace: tab.namespace || '',
            path: tab.path ||'',
            token: tab.token||'',
        })
    }

    /**
     * Returns this tab object
     * 
     * @param {Object} props component props
     * 
     * @return {Object} the tab object
     */
    static getThisTab (props) {
        const connections = props.connections.connections;
        const list = props.connections.list;
        let activeTab = props.activeTab;

        return list[connections[activeTab].index]
    }

    /**
     * Update url in component state
     * 
     * @param {Event} e
     */
    changeUrl (e) {
        this.setState({
            url: e.target.value
        })
    }

    /**
     * Update namespace in component state
     * 
     * @param {Event} e
     */
    changeNamespace (e) {
        this.setState({
            namespace: e.target.value
        })
    }

    changePath (e) {
        this.setState({
            path: e.target.value
        })
    }

    changeToken(e) {
        this.setState({
            token: e.target.value
        })
    }

    /**
     * Save new url to redux store
     * 
     * @param {Event} e
     */
    setNamespaceAndUrl (e) {
        e && e.preventDefault();
        const url = this.state.url;
        const namespace = this.state.namespace;
        const path = this.state.path;
        const token = this.state.token;

        if (url)
            this.props.setNamespaceAndUrl(this.state.tab.id, namespace, url, path, token)
    }

    render () {
        // const state = this.state
        // const connected = state.tab.connected
        // const tabUrl = state.tab.url

        // const state = this.state,
        //    connected = state.tab.connected,
        //    tabUrl = state.tab.url

        const {
            state,
            state: {
                tab: {
                    connected,
                    url: tabUrl,
                }
            }
        } = this;

        return (
            <div className="search">
                <RefreshIcon faded={connected || !tabUrl} setNamespaceAndUrl={this.setNamespaceAndUrl} />
                <TextBar url={state.url} originalUrl={tabUrl} changeUrl={this.changeUrl} setNamespaceAndUrl={this.setNamespaceAndUrl} connected={connected} />
                <NamespaceTextBar namespace={state.namespace} changeNamespace={this.changeNamespace} setNamespaceAndUrl={this.setNamespaceAndUrl} />
                <PathTextBar path={state.path} changePath={this.changePath} setNamespaceAndUrl={this.setNamespaceAndUrl} />
                <TokenTextBar token={state.token} changeToken={this.changeToken} setNamespaceAndUrl={this.setNamespaceAndUrl} />
            </div>
        )
    }
}

export default Search
