import { Injectable } from '@angular/core';
import { PageRouter } from '../models/page-router';


@Injectable()
export class RouterConfig {

    private pages: PageRouter[];
    private navs: PageRouter[];
    private tabs: PageRouter[];
    private pagesHash;
    private navsHash;
    private tabsHash;

    constructor(router) {
        this.pages = router;
        this.navs = this.getConfigByType('nav');
        this.tabs = this.getConfigByType('tabs');
        this.pagesHash = this.getConfigHash(this.pages);
        this.navsHash = this.getConfigHash(this.navs);
        this.tabsHash = this.getConfigHash(this.tabs);
    }

    public getPageConfigById = function (id: string): string {

        return this.pagesHash[id] || null;
    }

    private getConfigByType = function (type) {
        var pages = this.pages,
            config = [];

        pages.forEach((page, index, array) => {
            if (type === 'nav' && page.isNav) {
                config.push(page);
            }
            else if (type === 'tabs' && page.isTabs) {
                config.push(page);
            }
        });

        return config;
    }

    public getRouter = function (): PageRouter[] {
        return this.pages;
    };

    public getNavRouter = function (): PageRouter[] {
        return this.navs;
    };

    public getTabsRouter = function (): PageRouter[] {
        return this.tabs;
    };

    private getConfigHash = function (config: PageRouter[]) {
        var confighash = {};

        config.forEach((page, index, pages) => {
            confighash[page.id] = page;
        });
        return confighash;
    }

    public getPagesConfigHash = function () {
        return this.pagesHash;
    }

    public getNavConfigHash = function () {
        return this.navHash;
    }

    public getTabsConfiHash = function () {
        return this.tabsHash;
    }

    public getPagesRouterHash = function () {
        return this.pagesHash;
    };

    public getNavRouterHash = function () {
        return this.navHash;
    };

    public getTabsRouterHash = function () {
        return this.tabsHash;
    };
}