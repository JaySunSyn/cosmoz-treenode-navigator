(() => {
	'use strict';

	Polymer({
		behaviors: [
			Cosmoz.TranslatableBehavior
		],

		is: 'cosmoz-treenode-button-view',

		properties: {
			/*
			 * The main node structure
			 */
			tree: {
				type: Cosmoz.tree
			},
			/*
			 * Currently selected node object
			 */
			selectedNode: {
				type: Object,
				value() {
					return {};
				},
				notify: true
			},
			/**
			 * If true, reset button gets hidden
			 */
			noReset: {
				type: Boolean,
				value: false
			},
			/*
			 * Placeholder for the search field
			 */
			searchPlaceholder: {
				type: String
			},
			/*
			 * Placeholder for button text
			 */
			buttonTextPlaceholder: {
				type: String,
				value: 'No selection made'
			},
			/*
			 * The path of the selected node
			 */
			nodePath: {
				type: String,
				notify: true
			},
			/*
			 * The nodes on the path of the selected node
			 */
			nodesOnNodePath: {
				type: Array
			},
			/*
			 * Text displayed when local search has finished
			 * to suggest a search on the entire tree
			 */
			searchGlobalPlaceholder: {
				type: String
			},
			/*
			 * Settable text for dialog title.
			 */
			dialogText: {
				type: String,
				value: 'Search or navigate to chosen destination'
			},
			/*
			 * Minimum length before an search
			 * starts.
			 */
			searchMinLength: {
				type: Number
			},
			/*
			 * Path string of highlighted (focused) node
			 */
			highlightedNodePath: {
				type: String
			}
		},
		_enableReset(nodePath, noReset) {
			if (noReset) {
				return false;
			}
			return !!nodePath;
		},
		_getButtonLabel(pathParts, placeholder) {
			if (!Array.isArray(pathParts) || pathParts.length === 0) {
				return placeholder;
			}
			return pathParts.filter(n => n).map(part => part[this.tree.searchProperty]).join(' / ');
		},

		openDialogTree() {
			this.$.dialogTree.open();
		},
		focusSearch() {
			this.$.dialogTree.paperDialog.querySelector('#treeNavigator').focus();
		},
		reset() {
			this.nodePath = '';
		},
		selectNode() {
			this.nodePath = this.highlightedNodePath;
		},
		refit() {
			this.debounce('refit', function () {
				this.$.dialogTree.fit();
			}.bind(this), 50); // 5 was enough during test
		}
	});
})();
