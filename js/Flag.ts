class Flag {
    public static files = ['ad.svg',
        'ae.svg',
        'af.svg',
        'ag.svg',
        'ai.svg',
        'al.svg',
        'am.svg',
        'ao.svg',
        'aq.svg',
        'ar.svg',
        'as.svg',
        'at.svg',
        'au.svg',
        'aw.svg',
        'ax.svg',
        'az.svg',
        'ba.svg',
        'bb.svg',
        'bd.svg',
        'be.svg',
        'bf.svg',
        'bg.svg',
        'bh.svg',
        'bi.svg',
        'bj.svg',
        'bl.svg',
        'bm.svg',
        'bn.svg',
        'bo.svg',
        'bq.svg',
        'br.svg',
        'bs.svg',
        'bt.svg',
        'bv.svg',
        'bw.svg',
        'by.svg',
        'bz.svg',
        'ca.svg',
        'cc.svg',
        'cd.svg',
        'cf.svg',
        'cg.svg',
        'ch.svg',
        'ci.svg',
        'ck.svg',
        'cl.svg',
        'cm.svg',
        'cn.svg',
        'co.svg',
        'cr.svg',
        'cu.svg',
        'cv.svg',
        'cw.svg',
        'cx.svg',
        'cy.svg',
        'cz.svg',
        'de.svg',
        'dj.svg',
        'dk.svg',
        'dm.svg',
        'do.svg',
        'dz.svg',
        'ec.svg',
        'ee.svg',
        'eg.svg',
        'eh.svg',
        'er.svg',
        'es.svg',
        'et.svg',
        'fi.svg',
        'fj.svg',
        'fk.svg',
        'fm.svg',
        'fo.svg',
        'fr.svg',
        'ga.svg',
        'gb-eng.svg',
        'gb-nir.svg',
        'gb-sct.svg',
        'gb.svg',
        'gb-wls.svg',
        'gd.svg',
        'ge.svg',
        'gf.svg',
        'gg.svg',
        'gh.svg',
        'gi.svg',
        'gl.svg',
        'gm.svg',
        'gn.svg',
        'gp.svg',
        'gq.svg',
        'gr.svg',
        'gs.svg',
        'gt.svg',
        'gu.svg',
        'gw.svg',
        'gy.svg',
        'hk.svg',
        'hm.svg',
        'hn.svg',
        'hr.svg',
        'ht.svg',
        'hu.svg',
        'id.svg',
        'ie.svg',
        'il.svg',
        'im.svg',
        'in.svg',
        'io.svg',
        'iq.svg',
        'ir.svg',
        'is.svg',
        'it.svg',
        'je.svg',
        'jm.svg',
        'jo.svg',
        'jp.svg',
        'ke.svg',
        'kg.svg',
        'kh.svg',
        'ki.svg',
        'km.svg',
        'kn.svg',
        'kp.svg',
        'kr.svg',
        'kw.svg',
        'ky.svg',
        'kz.svg',
        'la.svg',
        'lb.svg',
        'lc.svg',
        'li.svg',
        'lk.svg',
        'lr.svg',
        'ls.svg',
        'lt.svg',
        'lu.svg',
        'lv.svg',
        'ly.svg',
        'ma.svg',
        'mc.svg',
        'md.svg',
        'me.svg',
        'mf.svg',
        'mg.svg',
        'mh.svg',
        'mk.svg',
        'ml.svg',
        'mm.svg',
        'mn.svg',
        'mo.svg',
        'mp.svg',
        'mq.svg',
        'mr.svg',
        'ms.svg',
        'mt.svg',
        'mu.svg',
        'mv.svg',
        'mw.svg',
        'mx.svg',
        'my.svg',
        'mz.svg',
        'na.svg',
        'nc.svg',
        'ne.svg',
        'nf.svg',
        'ng.svg',
        'ni.svg',
        'nl.svg',
        'no.svg',
        'np.svg',
        'nr.svg',
        'nu.svg',
        'nz.svg',
        'om.svg',
        'pa.svg',
        'pe.svg',
        'pf.svg',
        'pg.svg',
        'ph.svg',
        'pk.svg',
        'pl.svg',
        'pm.svg',
        'pn.svg',
        'pr.svg',
        'ps.svg',
        'pt.svg',
        'pw.svg',
        'py.svg',
        'qa.svg',
        're.svg',
        'ro.svg',
        'rs.svg',
        'ru.svg',
        'rw.svg',
        'sa.svg',
        'sb.svg',
        'sc.svg',
        'sd.svg',
        'se.svg',
        'sg.svg',
        'sh.svg',
        'si.svg',
        'sj.svg',
        'sk.svg',
        'sl.svg',
        'sm.svg',
        'sn.svg',
        'so.svg',
        'sr.svg',
        'ss.svg',
        'st.svg',
        'sv.svg',
        'sx.svg',
        'sy.svg',
        'sz.svg',
        'tc.svg',
        'td.svg',
        'tf.svg',
        'tg.svg',
        'th.svg',
        'tj.svg',
        'tk.svg',
        'tl.svg',
        'tm.svg',
        'tn.svg',
        'to.svg',
        'tr.svg',
        'tt.svg',
        'tv.svg',
        'tw.svg',
        'tz.svg',
        'ua.svg',
        'ug.svg',
        'um.svg',
        'us.svg',
        'uy.svg',
        'uz.svg',
        'va.svg',
        'vc.svg',
        've.svg',
        'vg.svg',
        'vi.svg',
        'vn.svg',
        'vu.svg',
        'wf.svg',
        'ws.svg',
        'xk.svg',
        'ye.svg',
        'yt.svg',
        'za.svg',
        'zm.svg',
        'zw.svg'];

    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _position: { x: number, y: number };
    protected _svg: HTMLImageElement;
    protected _isLoaded: boolean;
    protected _width: number;
    protected _height: number;
    protected _colors: string[];

    constructor(canvas: HTMLCanvasElement, position: { x: number, y: number }, width: number, height: number, path: string) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');

        this._position = position;
        this._width = width;
        this._height = height;
        this._isLoaded = false;

        this._svg = new Image();
        this._svg.src = path;
        let self = this;
        this._svg.addEventListener('load', function () {
            self._isLoaded = true;
        });
        this._colors = new Array();
        this._findColors();
    }

    update() {

    }

    render() {
        if (this._isLoaded) {
            this._context.drawImage(
                this._svg,
                this._position.x,
                this._position.y,
                this._width,
                this._height);
        }
    }

    protected _findColors() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this._svg.src);
        //xhr.open("GET", e.getAttribute(e.nodeName === "OBJECT" ? "data" : "src");
        xhr.send();
        let self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let str = xhr.responseText.toLowerCase();
                var regexp = /fill=["'](#[a-f0-6]{0,6})/gi;
                var matches = str.match(regexp);

                for (const fill of matches ||[]) {
                    let color = fill.replace('fill="', '');
                    color = (color == '#'? '#000': color);
                    
                    self._colors.push(color);
                }
            }
        };
    }

    public setGameColors():void{
        let counter = 0
        Settings.BACKGROUNDCOLOR = this._colors[counter++];
        Settings.OCCUPIEDFIELDCOLOR = this._colors[counter++];
        if (this._colors.length >= counter) {
            Settings.BOARDCOLOR = this._colors[counter-1];
        }else{
            Settings.BOARDCOLOR = this._colors[counter];
        }
        Settings.SHAPECOLORACTIVE = Settings.BOARDCOLOR;
           
       
        console.log(`the flag is ${this._svg.src}`);
        for (const c of this._colors) {
            console.log(c);
        }
    }
}