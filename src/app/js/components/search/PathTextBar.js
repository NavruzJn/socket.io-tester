/**
 * TextBar
 *
 * Renders the input field of the searchbar
 *
 * @property {String} namespace the current state of the input field
 * @property {Function} changeNamespace handle inputchange
 * @property {Function} setNamespaceAndUrl confirm namespace and url and save in redux store
 */

import React from 'react'

const PathTextBar = ({path, changePath, setNamespaceAndUrl}) =>
    <span className="search-text namespace-text">
        <form className="search-text-form" onSubmit={setNamespaceAndUrl}>
            <input onChange={changePath} className="search-text-input" type="text" value={path} placeholder="path (optional)" />
        </form>
    </span>;

export default PathTextBar
