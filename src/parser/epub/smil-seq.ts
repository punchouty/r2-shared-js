// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import {
    XmlDiscriminatorValue, XmlItemType, XmlObject, XmlXPathSelector,
} from "@r2-utils-js/_utils/xml-js-mapper";

import { tryDecodeURI } from "../../_utils/decodeURI";
import { Par } from "./smil-par";
import { SeqOrPar } from "./smil-seq-or-par";

@XmlObject({
    epub: "http://www.idpf.org/2007/ops",
    smil: "http://www.w3.org/ns/SMIL",
})
@XmlDiscriminatorValue("seq")
export class Seq extends SeqOrPar {

    // XPATH ROOT: /smil:smil/smil:body
    // XPATH ROOT: /smil:smil/smil:body/**/smil:seq

    @XmlXPathSelector("par|seq")
    @XmlItemType(SeqOrPar)
    public Children!: SeqOrPar[];

    @XmlXPathSelector("seq")
    @XmlItemType(Seq)
    public Seq: Seq[] = [];

    @XmlXPathSelector("par")
    @XmlItemType(Par)
    public Par: Par[] = [];

    @XmlXPathSelector("@epub:textref")
    public TextRef1!: string;
    get TextRef(): string {
        return this.TextRef1;
    }
    set TextRef(href: string) {
        this.TextRef1 = href;
        this._urlDecoded = undefined;
    }
    private _urlDecoded: string | undefined | null;
    get TextRefDecoded(): string | undefined {
        if (this._urlDecoded) {
            return this._urlDecoded;
        }
        if (this._urlDecoded === null) {
            return undefined;
        }
        if (!this.TextRef) {
            this._urlDecoded = null;
            return undefined;
        }
        this._urlDecoded = tryDecodeURI(this.TextRef);
        return !this._urlDecoded ? undefined : this._urlDecoded;
    }
    set TextRefDecoded(href: string | undefined) {
        this._urlDecoded = href;
    }
    public setTextRefDecoded(href: string) {
        this.TextRef = href;
        this.TextRefDecoded = href;
    }

    // constructor() {
    //     super();
    //     this.localName = "seq";
    // }
}
