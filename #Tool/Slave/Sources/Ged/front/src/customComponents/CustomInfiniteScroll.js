import InfiniteScroll from "react-infinite-scroller/dist/InfiniteScroll"

class CustomInfiniteScroll extends InfiniteScroll {
    constructor(props) {
        super(props);
        this.scrollListener = () => {
            var el = this.scrollComponent;
            var scrollEl = window;
            var parentNode = this.getParentElement(el);

            var offset = void 0;
            if (this.props.useWindow) {
                var doc = document.documentElement || document.body.parentNode || document.body;
                var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;
                if (this.props.isReverse) {
                    offset = scrollTop;
                } else {
                    offset = this.calculateOffset(el, scrollTop);
                }
            } else if (this.props.isReverse) {
                offset = parentNode.scrollTop;
                //offset = el.parentNode.scrollTop
            } else {
                // fix is here
                offset = el.parentNode.scrollHeight - el.parentNode.clientHeight - el.parentNode.scrollTop;
            }

            // Here we make sure the element is visible as well as checking the offset
            if (offset < Number(this.props.threshold) && el && el.offsetParent !== null) {
                this.detachScrollListener();
                this.beforeScrollHeight = parentNode.scrollHeight;
                this.beforeScrollTop = parentNode.scrollTop;
                // Call loadMore after detachScrollListener to allow for non-async loadMore functions
                if ('function' === typeof this.props.loadMore) {
                    this.props.loadMore(this.pageLoaded += 1);
                    this.loadMore = true;
                }
            }
        }
    }
}

export default CustomInfiniteScroll;