var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var saveVer = 6;
var jsVer = 5;
var SAVE_DATA_LOCALSTORAGE = 'saveData';
var SAVE_TO_LOCALSTORAGE = true;
var CARRERAS = [];
var unapecPensumUrl = 'https://servicios.unapec.edu.do/pensum/Main/Detalles/';
var allIgnored = {}; // Mats that are no longer available and should be ommited from the pensum
var currentPensumData = null;
var currentPensumCode = '';
var currentPensumMats = {};
var errorCodes = new Set();
var errorCodesLog = [];
var filterMode = {
    pending: true,
    onCourse: true,
    passed: true,
};
var currentProgress = new Set();
/**
 * TODO: Allow ctrl+z on these things... maybe via a userProgress methods:
 * DoState - push to doStack, clears UndoStack.
 * UndoState - pops from doStack, push to undoStack.
 * ClearState - clears both stacks.
 */
var userProgress = {
    passed: new Set(),
    onCourse: new Set(),
};
var SelectMode;
(function (SelectMode) {
    SelectMode[SelectMode["Passed"] = 0] = "Passed";
    SelectMode[SelectMode["OnCourse"] = 1] = "OnCourse";
})(SelectMode || (SelectMode = {}));
var userSelectMode = SelectMode.Passed;
function getUserProgressList(mode) {
    var _a;
    var a = (_a = {},
        _a[SelectMode.Passed] = 'passed',
        _a[SelectMode.OnCourse] = 'onCourse',
        _a);
    return userProgress[a[mode]];
}
var orgChartSettings = {
    scale: 0.7,
};
FileSaver.saveAs = saveAs;
var MANAGEMENT_TAKEN_CSS_CLASS = 'managementMode-taken';
var MANAGEMENT_ONCOURSE_CSS_CLASS = 'managementMode-oncourse';
var MANAGEMENT_SELECTED_CSS_CLASS = 'managementMode-selected';
var MANAGEMENT_ERROR_CSS_CLASS = 'managementMode-error';
var CURRENT_PENSUM_VERSION = 2; // Update this if new mats are added to IgnoredMats.json
/** Loads the node given at 'input' into the DOM */
function fetchPensumTable(pensumCode, requestCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var urlToLoad, text, parser, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlToLoad = unapecPensumUrl + pensumCode;
                    return [4 /*yield*/, fetchHtmlAsText(urlToLoad, { cache: 'force-cache' }, -1, requestCallback)];
                case 1:
                    text = _a.sent();
                    parser = new DOMParser();
                    doc = parser.parseFromString(text, 'text/xml');
                    return [2 /*return*/, doc];
            }
        });
    });
}
/**
 * Converts the node fetched from UNAPEC to a jObject.
 * @param {Element} node
 */
function extractPensumData(node) {
    var out = {
        carrera: '',
        codigo: '',
        vigencia: '',
        infoCarrera: [],
        cuats: [],
        error: null,
        version: CURRENT_PENSUM_VERSION,
    };
    // Verify if pensum is actually valid data
    if (node.getElementsByClassName('contPensum').length == 0 ||
        node.getElementsByClassName('contPensum')[0].children.length < 2) {
        return null;
    }
    // Extract basic data
    var cabPensum = node.getElementsByClassName('cabPensum')[0];
    out.carrera = cabPensum.firstElementChild.textContent.trim();
    var pMeta = cabPensum.getElementsByTagName('p')[0].children;
    out.codigo = pMeta[0].textContent.trim();
    out.vigencia = pMeta[1].textContent.trim();
    // Extract infoCarrera
    var infoCarrera = node.getElementsByClassName('infoCarrera')[0].children;
    for (var i = 0; i < infoCarrera.length; ++i) {
        out.infoCarrera.push(infoCarrera[i].textContent.replace(/\n/g, ' ').trim());
    }
    // Extract cuats
    var cuatrim = node.getElementsByClassName('cuatrim');
    var ignoredMats = new Set(allIgnored[out.codigo]);
    for (var i = 0; i < cuatrim.length; ++i) {
        /**
         * @type {HTMLTableElement}
         */
        var currentCuatTable = cuatrim[i];
        var rows = currentCuatTable.children;
        var outCuat = [];
        for (var j = 1; j < rows.length; ++j) {
            var outMat = {
                codigo: '',
                asignatura: '',
                creditos: 0,
                prereq: [],
                prereqExtra: [],
                cuatrimestre: 0,
            };
            var currentRows = rows[j].children;
            outMat.codigo = currentRows[0].textContent.trim();
            outMat.asignatura = currentRows[1].textContent.trim();
            outMat.creditos = parseFloat(currentRows[2].textContent);
            outMat.cuatrimestre = i + 1;
            // Prerequisitos
            var splitPrereq = currentRows[3].textContent
                .replace(/\n/g, ',')
                .split(',')
                .map(function (x) { return x.trim(); })
                .filter(function (e) { return e !== ''; });
            for (var i_1 = 0; i_1 < splitPrereq.length; i_1++) {
                var a = splitPrereq[i_1];
                if (a.length < 8)
                    outMat.prereq.push(a);
                else
                    outMat.prereqExtra.push(a);
            }
            if (!ignoredMats.has(outMat.codigo))
                outCuat.push(outMat);
        }
        out.cuats.push(outCuat);
    }
    return out;
}
/** Maps an array of Mats to an dict where the keys are the Mats' code */
function matsToDict(arr) {
    var e_1, _a, e_2, _b, e_3, _c;
    var out = {};
    errorCodes = new Set();
    errorCodesLog = [];
    try {
        // Map all mats
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var x = arr_1_1.value;
            out[x.codigo] = __assign(__assign({}, x), { postreq: [] });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        // find postreqs
        for (var arr_2 = __values(arr), arr_2_1 = arr_2.next(); !arr_2_1.done; arr_2_1 = arr_2.next()) {
            var x = arr_2_1.value;
            try {
                for (var _d = (e_3 = void 0, __values(x.prereq)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var y = _e.value;
                    var pre = out[y];
                    if (!pre) {
                        console.error("[ERROR!]: No se encuentra la materia \"" + y + "\" (prerequisito de \"" + x.codigo + "\")");
                        errorCodes.add(y);
                        errorCodesLog.push([y, x.codigo]);
                    }
                    else {
                        pre.postreq.push(x.codigo);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (arr_2_1 && !arr_2_1.done && (_b = arr_2.return)) _b.call(arr_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return out;
}
// Creates a single clickable mat code, for use inside dialogs.
function createMatBtn(dialog, code, simple) {
    var _a;
    if (simple === void 0) { simple = false; }
    var s = document.createElement('a');
    s.textContent = simple ? code : "(" + code + ") " + (((_a = currentPensumMats[code]) === null || _a === void 0 ? void 0 : _a.asignatura) || '?');
    s.addEventListener('click', function () {
        if (dialog)
            dialog.hide();
        dialog_Mat(code).show();
    });
    s.classList.add('preReq');
    s.classList.add('monospace');
    s.classList.add("c_" + safeForHtmlId(code));
    s.classList.add("c__");
    return s;
}
/** Adds or removes MANAGEMENT_TAKEN_CLASS to the related elements. */
function updatePrereqClasses(node) {
    var e_4, _a, e_5, _b, e_6, _c, e_7, _d, e_8, _e, e_9, _f, e_10, _g;
    if (node === void 0) { node = document; }
    try {
        // getElementsByClassName has O(1) complexity, since the DOM tracks them.
        for (var _h = __values(node.getElementsByClassName('c__')), _j = _h.next(); !_j.done; _j = _h.next()) {
            var elem = _j.value;
            elem.classList.remove(MANAGEMENT_TAKEN_CSS_CLASS, MANAGEMENT_ONCOURSE_CSS_CLASS, MANAGEMENT_SELECTED_CSS_CLASS, MANAGEMENT_ERROR_CSS_CLASS);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var _k = __values(userProgress.passed), _l = _k.next(); !_l.done; _l = _k.next()) {
            var code = _l.value;
            code = safeForHtmlId(code);
            try {
                for (var _m = (e_6 = void 0, __values(node.getElementsByClassName("c_" + code))), _o = _m.next(); !_o.done; _o = _m.next()) {
                    var elem = _o.value;
                    elem.classList.add(MANAGEMENT_TAKEN_CSS_CLASS);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_l && !_l.done && (_b = _k.return)) _b.call(_k);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var _p = __values(userProgress.onCourse), _q = _p.next(); !_q.done; _q = _p.next()) {
            var code = _q.value;
            code = safeForHtmlId(code);
            try {
                for (var _r = (e_8 = void 0, __values(node.getElementsByClassName("c_" + code))), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var elem = _s.value;
                    elem.classList.add(MANAGEMENT_ONCOURSE_CSS_CLASS);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_q && !_q.done && (_d = _p.return)) _d.call(_p);
        }
        finally { if (e_7) throw e_7.error; }
    }
    try {
        for (var errorCodes_1 = __values(errorCodes), errorCodes_1_1 = errorCodes_1.next(); !errorCodes_1_1.done; errorCodes_1_1 = errorCodes_1.next()) {
            var code = errorCodes_1_1.value;
            code = safeForHtmlId(code);
            try {
                for (var _t = (e_10 = void 0, __values(node.getElementsByClassName("c_" + code))), _u = _t.next(); !_u.done; _u = _t.next()) {
                    var elem = _u.value;
                    elem.classList.add(MANAGEMENT_ERROR_CSS_CLASS);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_u && !_u.done && (_g = _t.return)) _g.call(_t);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (errorCodes_1_1 && !errorCodes_1_1.done && (_f = errorCodes_1.return)) _f.call(errorCodes_1);
        }
        finally { if (e_9) throw e_9.error; }
    }
}
/** Adds or removes MANAGEMENT_TAKEN_CLASS to a single element. */
function updatePrereqClassesSingle(elem) {
    var e_11, _a, e_12, _b, e_13, _c;
    var cl = elem.classList;
    if (!cl.contains('c__'))
        return;
    elem.classList.remove(MANAGEMENT_TAKEN_CSS_CLASS, MANAGEMENT_ONCOURSE_CSS_CLASS, MANAGEMENT_SELECTED_CSS_CLASS, MANAGEMENT_ERROR_CSS_CLASS);
    try {
        for (var _d = __values(userProgress.passed), _e = _d.next(); !_e.done; _e = _d.next()) {
            var code = _e.value;
            code = safeForHtmlId(code);
            if (cl.contains("c_" + code))
                cl.add(MANAGEMENT_TAKEN_CSS_CLASS);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_11) throw e_11.error; }
    }
    try {
        for (var _f = __values(userProgress.onCourse), _g = _f.next(); !_g.done; _g = _f.next()) {
            var code = _g.value;
            code = safeForHtmlId(code);
            if (cl.contains("c_" + code))
                cl.add(MANAGEMENT_ONCOURSE_CSS_CLASS);
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
        }
        finally { if (e_12) throw e_12.error; }
    }
    try {
        for (var errorCodes_2 = __values(errorCodes), errorCodes_2_1 = errorCodes_2.next(); !errorCodes_2_1.done; errorCodes_2_1 = errorCodes_2.next()) {
            var code = errorCodes_2_1.value;
            code = safeForHtmlId(code);
            if (cl.contains("c_" + code)) {
                cl.add(MANAGEMENT_ERROR_CSS_CLASS);
            }
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (errorCodes_2_1 && !errorCodes_2_1.done && (_c = errorCodes_2.return)) _c.call(errorCodes_2);
        }
        finally { if (e_13) throw e_13.error; }
    }
}
/**
 * Returns the following data for the given mats code array
 * (based on the loaded pensum):
 * - Current creds
 * - Total creds
 *
 * @param {*} matArray Array of mats codes (e.g. [ESP101, IDI033...])
 */
function analyseGradeProgress(matArray) {
    var out = {
        totalCreds: 0,
        passedCreds: 0,
        passedMats: 0,
        onCourseCreds: 0,
        onCourseMats: 0,
        totalMats: Object.keys(currentPensumMats).length,
    };
    for (var matCode in currentPensumMats) {
        var currentMatObj = currentPensumMats[matCode];
        out.totalCreds += currentMatObj.creditos;
        if (matArray.passed.has(matCode)) {
            out.passedCreds += currentMatObj.creditos;
            ++out.passedMats;
        }
        else if (matArray.onCourse.has(matCode)) {
            out.onCourseCreds += currentMatObj.creditos;
            ++out.onCourseMats;
        }
    }
    return out;
}
/** Creates n label-checkbox pairs */
function createCheckbox(node, labelName, onchange, initialState) {
    if (initialState === void 0) { initialState = false; }
    var objId = safeForHtmlId(labelName);
    var x = document.createElement('input');
    x.type = 'checkbox';
    x.id = objId;
    x.checked = initialState;
    x.addEventListener('change', onchange);
    node.appendChild(x);
    var l = document.createElement('label');
    l.textContent = labelName;
    l.htmlFor = objId;
    node.appendChild(l);
    return [x, l];
}
function createRadio(node, groupName, labelName, onchange, initialState) {
    if (groupName === void 0) { groupName = ''; }
    if (labelName === void 0) { labelName = ''; }
    if (onchange === void 0) { onchange = null; }
    if (initialState === void 0) { initialState = false; }
    var objId = safeForHtmlId(labelName);
    var x = document.createElement('input');
    x.type = 'radio';
    x.name = groupName;
    x.id = objId;
    x.checked = initialState;
    x.addEventListener('change', onchange);
    node.appendChild(x);
    var l = document.createElement('label');
    l.textContent = labelName;
    l.htmlFor = objId;
    node.appendChild(l);
    return [x, l];
}
/** Updates the element #toolboxWrapper */
function createToolbox() {
    var e_14, _a, e_15, _b, e_16, _c;
    var node = document.getElementById('toolboxWrapper');
    node.innerHTML = '';
    {
        var wrapper = createElement(node, 'div');
        createElement(wrapper, 'h4', 'Filtrar materias');
        var d = createElement(wrapper, 'form', null, ['filter-mode']);
        var a = [
            { label: 'Pendientes', key: 'pending' },
            { label: 'Cursando', key: 'onCourse' },
            { label: 'Aprobadas', key: 'passed' },
        ];
        var _loop_1 = function (x) {
            var fn = function (obj) {
                filterMode[x.key] = obj.target.checked;
                drawPensumTable();
                // TODO: Try to make filtering a bit more dynamic (dont redraw entire table)
            };
            createCheckbox(d, x.label, fn, filterMode[x.key]);
        };
        try {
            for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
                var x = a_1_1.value;
                _loop_1(x);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
    }
    {
        var wrapper = createElement(node, 'div');
        createElement(wrapper, 'h4', 'Modo de interacción');
        var d = createElement(wrapper, 'form', null, ['select-mode']);
        var a = [
            { label: 'Aprobar', key: SelectMode.Passed },
            { label: 'Cursar', key: SelectMode.OnCourse },
        ];
        var _loop_2 = function (x) {
            var fn = function () { return userSelectMode = x.key; };
            var selected = userSelectMode === x.key;
            createRadio(d, 'userSelect', x.label, fn, selected);
        };
        try {
            for (var a_2 = __values(a), a_2_1 = a_2.next(); !a_2_1.done; a_2_1 = a_2.next()) {
                var x = a_2_1.value;
                _loop_2(x);
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (a_2_1 && !a_2_1.done && (_b = a_2.return)) _b.call(a_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
    }
    {
        var wrapper = createElement(node, 'div');
        var title = createElement(wrapper, 'h4', 'Acciones:');
        var dw = createElement(wrapper, 'div', null, []);
        dw.id = 'actionsWrapper';
        //updateSelectionBox();
        var actions = [
            {
                label: 'Aprobar materias en curso',
                action: function () {
                    __spread(userProgress.onCourse).forEach(function (x) {
                        removeBySelectMode(x, SelectMode.OnCourse);
                        addBySelectMode(x, SelectMode.Passed);
                    });
                    updatePrereqClasses();
                    updateGradeProgress();
                },
            },
            {
                label: 'Calcular indice',
                action: function () { return dialog_IndiceCuatrimestral().show(); },
            },
        ];
        try {
            for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                var actionBtn = actions_1_1.value;
                createElement(dw, 'span', actionBtn.label, ['btn-secondary'])
                    .addEventListener('click', actionBtn.action);
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (actions_1_1 && !actions_1_1.done && (_c = actions_1.return)) _c.call(actions_1);
            }
            finally { if (e_16) throw e_16.error; }
        }
    }
}
function processSelectedData(data) {
    var mats = Object.values(currentPensumMats).filter(function (x) { return data.has(x.codigo); });
    var out = {
        materias: mats.length,
        creditos: mats.reduce(function (acc, v) { return acc += v.creditos; }, 0),
    };
    return out;
}
/** Updates the element #progressWrapper with data
 * related to the user's mats selection */
function updateGradeProgress() {
    var progressData = analyseGradeProgress(userProgress);
    var node = document.getElementById('progressWrapper');
    node.innerHTML = '';
    var n1 = ((100 * progressData.passedCreds) / progressData.totalCreds);
    var n2 = ((100 * progressData.onCourseCreds) / progressData.totalCreds);
    var bg = [
        'linear-gradient(to right, ',
        "var(--progress-bar-green) " + n1.toFixed(2) + "%, ",
        "var(--progress-bar-yellow) " + n1.toFixed(2) + "%, ",
        "var(--progress-bar-yellow) " + (n1 + n2).toFixed(2) + "%, ",
        "var(--background) " + (n1 + n2).toFixed(2) + "%)",
    ].join('');
    node.style.backgroundImage = bg;
    createElement(node, 'h3', 'Progreso en la carrera: ');
    var ul = createElement(node, 'ul');
    // Percent of mats
    var mp = ((100 * progressData.passedMats) / progressData.totalMats);
    var mc = ((100 * progressData.onCourseMats) / progressData.totalMats);
    createElement(ul, 'li', "Materias aprobadas: " + progressData.passedMats + "/" + progressData.totalMats + " (" + mp.toFixed(2) + "%)");
    createElement(ul, 'li', "Creditos aprobados: " + progressData.passedCreds + "/" + progressData.totalCreds + " (" + n1.toFixed(2) + "%)");
    createElement(ul, 'li', "Materias en curso: +" + progressData.onCourseMats + "/" + progressData.totalMats + " (+" + mc.toFixed(2) + "%)");
    createElement(ul, 'li', "Creditos en curso: +" + progressData.onCourseCreds + "/" + progressData.totalCreds + " (+" + n2.toFixed(2) + "%)");
}
/**
 * Recreates the pensumData, as a new formatted table.
 * Cols:
 *  - CUAT indicator
 *  - Codigo
 *  - Nombre
 *  - Creds
 *  - Prereq
 * @param {*} data
 */
function createPensumTable(data) {
    var e_17, _a, e_18, _b;
    var out = document.createElement('table');
    // Create the header
    var headerRow = out.createTHead();
    try {
        for (var _c = __values([
            'Ct',
            '✔',
            'Codigo',
            'Asignatura',
            'Cr',
            'Pre-requisitos',
        ]), _d = _c.next(); !_d.done; _d = _c.next()) {
            var x = _d.value;
            var a = document.createElement('th');
            a.textContent = x;
            headerRow.appendChild(a);
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_17) throw e_17.error; }
    }
    var _loop_3 = function (idxCuat, cuat) {
        var e_19, _a;
        // new table per cuat
        var filteredCuat = filterMats(cuat);
        if (filteredCuat.length === 0)
            return "continue";
        var tbody = out.createTBody();
        tbody.dataset.cuat = (idxCuat + 1).toString();
        tbody.classList.add('cuatLimit');
        // First row (cuat number)
        {
            var row = tbody.insertRow();
            var th = document.createElement('th');
            th.rowSpan = filteredCuat.length + 1;
            var t = (filteredCuat.length === 1) ? 'C.' : 'Cuat. ';
            var p = createElement(th, 'p', "" + t + (idxCuat + 1), ['vertical-text']);
            row.classList.add('cuatLimit');
            th.classList.add('cuatHeader');
            // Allow all cuats selection
            // TODO: Do with a SELECT_MODE TOOL instead
            var selectAllUnderCuat = function () {
                // Check if all are checked
                var currentCuatMats = cuat.map(function (x) { return x.codigo; });
                var passed = userProgress.passed, onCourse = userProgress.onCourse;
                var _a = __read((userSelectMode === SelectMode.Passed) ? [passed, onCourse] : [onCourse, passed], 2), main = _a[0], second = _a[1];
                /**
                 * Cases:
                 * - All unselected: just add all
                 * - All on both, none unselected: finish adding all (same as prev.)
                 * - All on main: remove all;
                 * - Some holes: set holes only.
                 */
                var onMain = currentCuatMats.filter(function (x) { return main.has(x); });
                var onSecond = currentCuatMats.filter(function (x) { return second.has(x); });
                var unselected = currentCuatMats.filter(function (x) { return !main.has(x) && !second.has(x); });
                var n = currentCuatMats.length;
                var allOnMain = onMain.length === n;
                var allOnBoth = onMain.length + onSecond.length === n;
                var allUnselected = unselected.length === n;
                if (allOnMain) {
                    onMain.forEach(function (x) { return removeBySelectMode(x, userSelectMode); });
                }
                else if (allUnselected || allOnBoth) {
                    currentCuatMats.forEach(function (x) { return addBySelectMode(x, userSelectMode); });
                }
                else { // someUnselected
                    unselected.forEach(function (x) { return addBySelectMode(x, userSelectMode); });
                }
                // TODO: Dont redraw on every action...
                drawPensumTable();
            };
            th.addEventListener('click', selectAllUnderCuat);
            row.appendChild(th);
        }
        var _loop_4 = function (mat) {
            var row = out.insertRow();
            var code = safeForHtmlId(mat.codigo);
            row.id = "r_" + code;
            row.classList.add("c_" + code);
            row.classList.add("c__");
            // Selection checkbox
            {
                var cell = row.insertCell();
                cell.classList.add('text-center');
                cell.classList.add('managementMode-cell');
                var cellContent = document.createElement('div');
                cellContent.classList.add('mat-clickable');
                //if (userProgress.passed.has(mat.codigo)) s.checked = true;
                var selectSingleMat = function () {
                    var selectSet = getUserProgressList(userSelectMode);
                    if (selectSet.has(mat.codigo))
                        removeBySelectMode(mat.codigo, userSelectMode);
                    else
                        addBySelectMode(mat.codigo, userSelectMode);
                    updatePrereqClasses();
                    updateGradeProgress();
                    drawPensumTable();
                };
                cellContent.addEventListener('click', selectSingleMat);
                cell.appendChild(cellContent);
            }
            // Codigo mat.
            {
                var cell = row.insertCell();
                cell.id = "a_" + code;
                cell.classList.add('text-center');
                cell.classList.add("c_" + code);
                cell.classList.add("c__");
                var cellContent = document.createElement('a');
                cellContent.textContent = "" + mat.codigo;
                cellContent.addEventListener('click', function () {
                    dialog_Mat(mat.codigo).show();
                });
                cellContent.classList.add('codigo');
                cellContent.classList.add('monospace');
                cell.appendChild(cellContent);
            }
            // Asignatura
            row.insertCell().textContent = mat.asignatura;
            // Creditos
            {
                var cell = row.insertCell();
                cell.textContent = mat.creditos.toString();
                cell.classList.add('text-center');
            }
            // Prereqs
            {
                var r_1 = row.insertCell();
                mat.prereq.forEach(function (x) {
                    var s = createMatBtn(null, x, true);
                    r_1.appendChild(s);
                    r_1.appendChild(document.createTextNode('\t'));
                });
                mat.prereqExtra.forEach(function (x) {
                    var s = document.createElement('a');
                    s.textContent = x;
                    s.classList.add('preReq');
                    s.classList.add('preReqExtra');
                    r_1.appendChild(s);
                    r_1.appendChild(document.createTextNode('\t'));
                });
            }
        };
        try {
            // Mat rows
            for (var filteredCuat_1 = (e_19 = void 0, __values(filteredCuat)), filteredCuat_1_1 = filteredCuat_1.next(); !filteredCuat_1_1.done; filteredCuat_1_1 = filteredCuat_1.next()) {
                var mat = filteredCuat_1_1.value;
                _loop_4(mat);
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (filteredCuat_1_1 && !filteredCuat_1_1.done && (_a = filteredCuat_1.return)) _a.call(filteredCuat_1);
            }
            finally { if (e_19) throw e_19.error; }
        }
    };
    try {
        for (var _e = __values(data.cuats.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var _g = __read(_f.value, 2), idxCuat = _g[0], cuat = _g[1];
            _loop_3(idxCuat, cuat);
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_18) throw e_18.error; }
    }
    updatePrereqClasses(out);
    updateGradeProgress();
    return out;
}
//** Filters the given mat[] according to filterMode */
function filterMats(mats) {
    if (Object.values(filterMode).every(function (x) { return x; }))
        return mats;
    return mats.filter(function (x) {
        return (filterMode.onCourse && userProgress.onCourse.has(x.codigo)) ||
            (filterMode.passed && userProgress.passed.has(x.codigo)) ||
            (filterMode.pending) && (!userProgress.onCourse.has(x.codigo) && !userProgress.passed.has(x.codigo));
    });
}
function addBySelectMode(mat, mode) {
    switch (mode) {
        case (SelectMode.OnCourse):
            userProgress.passed.delete(mat);
            userProgress.onCourse.add(mat);
            break;
        case (SelectMode.Passed):
            userProgress.onCourse.delete(mat);
            userProgress.passed.add(mat);
            break;
        default:
            break;
    }
}
function removeBySelectMode(mat, mode) {
    switch (mode) {
        case (SelectMode.OnCourse):
            userProgress.onCourse.delete(mat);
            break;
        case (SelectMode.Passed):
            userProgress.passed.delete(mat);
            break;
        default:
            break;
    }
}
/**
 * Recreates the pensumData, as a new formatted table.
 * Cols:
 *  - CUAT indicator
 *  - Codigo
 *  - Nombre
 *  - Creds
 *  - Prereq
 */
function createExcelWorkbookFromPensum(data, progress) {
    if (progress === void 0) { progress = []; }
    var currentProgress = new Set(progress);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.book_append_sheet(wb, ws, 'Pensum');
    ws['!ref'] = 'A1:H300'; // Working range
    ws['!merges'] = [];
    function mergeCells(r1, c1, r2, c2) {
        ws['!merges'].push({ s: { r: r1, c: c1 }, e: { r: r2, c: c2 } });
    }
    var COL_CUAT = 'A';
    var COL_CODIGO = 'B';
    var COL_NOMBRE = 'C';
    var COL_CREDITOS = 'D';
    var COL_PREREQ = 'EFG';
    var COL_APROB = 'H';
    var COLS = 'ABCDEFGH';
    ws['!cols'] = [
        { width: 3 },
        { width: 9 },
        { width: 50 },
        { width: 7 },
        { width: 9 },
        { width: 9 },
        { width: 9 },
        { width: 5 },
    ];
    var currentRow = 1;
    ws[COLS[0] + currentRow] = { v: data.carrera, t: 's' };
    mergeCells(0, 0, 0, 7);
    ++currentRow;
    // create the header
    var headers = [
        'Ct',
        'Codigo',
        'Asignatura',
        'Créditos',
        'Pre-req #1',
        'Pre-req #2',
        'Pre-req #3',
        'Aprobada?',
    ];
    for (var i = 0; i < headers.length; ++i) {
        ws[COLS[i] + currentRow] = { v: headers[i], t: 's' };
    }
    ++currentRow;
    // create the contents
    data.cuats.forEach(function (cuat, idxCuat) {
        var filteredCuat = cuat;
        filteredCuat.forEach(function (mat, idxMat, currentCuat) {
            var e_20, _a, e_21, _b;
            ws[COL_CUAT + currentRow] = { v: idxCuat + 1, t: 'n' };
            if (idxMat === 0) {
                mergeCells(currentRow - 1, 0, currentRow - 1 + currentCuat.length - 1, 0);
            }
            // Codigo mat.
            ws[COL_CODIGO + currentRow] = { v: mat.codigo, t: 's' };
            // Asignatura
            ws[COL_NOMBRE + currentRow] = { v: mat.asignatura, t: 's' };
            // Creditos
            ws[COL_CREDITOS + currentRow] = { v: mat.creditos, t: 'n' };
            // Prereqs
            var prereqCount = 0;
            try {
                for (var _c = __values(mat.prereq), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var x = _d.value;
                    ws[COL_PREREQ[prereqCount] + currentRow] = { v: x, t: 's' };
                    ++prereqCount;
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_20) throw e_20.error; }
            }
            try {
                for (var _e = __values(mat.prereqExtra), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var x = _f.value;
                    ws[COL_PREREQ[prereqCount] + currentRow] = { v: x, t: 's' };
                    ++prereqCount;
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_21) throw e_21.error; }
            }
            // Aprobada
            var aprobVal = currentProgress.has(mat.codigo) ? 1 : 0;
            ws[COL_APROB + currentRow] = { v: aprobVal, t: 'n' };
            ++currentRow;
        });
    });
    try {
        var _a = __read(data.vigencia
            .split('/')
            .map(function (x) { return parseFloat(x); }), 3), cd_d = _a[0], cd_m = _a[1], cd_y = _a[2];
        var createDate = new Date(cd_y, cd_m, cd_d);
    }
    catch (_b) {
        var createDate = new Date();
    }
    wb.Props = {
        Title: "Pensum " + data.codigo + " " + titleCase(data.carrera),
        CreatedDate: createDate,
    };
    return wb;
}
function createExcelWorkbookFromData(arrayOfArrays, SheetName, Props) {
    var wb = XLSX.utils.book_new();
    wb.Props = Props || { Title: SheetName };
    wb.SheetNames.push(SheetName);
    var ws = XLSX.utils.aoa_to_sheet(arrayOfArrays);
    wb.Sheets[SheetName] = ws;
    return wb;
}
function writeExcelWorkbookAsXlsx(wb) {
    var wb_out = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    return wb_out;
}
function downloadXlsx(wb_out, fileNameWithoutExt) {
    var fileName = fileNameWithoutExt + '.xlsx';
    // Convert binary data to octet stream
    var buf = new ArrayBuffer(wb_out.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < wb_out.length; i++)
        view[i] = wb_out.charCodeAt(i) & 0xff; //convert to octet
    // Download
    var blob = new Blob([buf], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, fileName);
}
function downloadCurrentPensumAsExcel() {
    var wb = createExcelWorkbookFromPensum(currentPensumData);
    var wb_out = writeExcelWorkbookAsXlsx(wb);
    downloadXlsx(wb_out, wb.Props.Title);
}
/**
 * Creates a table that contains the pensum's general info.
 * @param {*} data
 */
function createInfoList(data) {
    var e_22, _a;
    /** @type {HTMLTableElement} */
    var out = document.createElement('ul');
    // Separate the text before outputting.
    var outTextArr = parseInfoList(data);
    try {
        // Format the text as a list
        for (var outTextArr_1 = __values(outTextArr), outTextArr_1_1 = outTextArr_1.next(); !outTextArr_1_1.done; outTextArr_1_1 = outTextArr_1.next()) {
            var x = outTextArr_1_1.value;
            var li = document.createElement('li');
            switch (x.type) {
                case 'simple':
                    li.textContent = x.data;
                    break;
                case 'double':
                    var t0 = sentenceCase(x.data[0]), t1 = x.data[1];
                    li.innerHTML = "<b>" + t0 + ":</b>\t" + t1;
                    break;
                case 'double_sublist':
                    var t0 = sentenceCase(x.data[0]);
                    li.innerHTML = "<b>" + t0 + ": </b>";
                    var subul = document.createElement('ul');
                    x.data[1].forEach(function (elem) {
                        var subli = document.createElement('li');
                        subli.textContent = elem + '.';
                        subul.appendChild(subli);
                    });
                    li.appendChild(subul);
                    break;
            }
            out.appendChild(li);
        }
    }
    catch (e_22_1) { e_22 = { error: e_22_1 }; }
    finally {
        try {
            if (outTextArr_1_1 && !outTextArr_1_1.done && (_a = outTextArr_1.return)) _a.call(outTextArr_1);
        }
        finally { if (e_22) throw e_22.error; }
    }
    return out;
}
/** Extracts and separates the information on 'data.infoCarrera' */
function parseInfoList(data) {
    return data.infoCarrera.map(function (x) {
        var splitOnFirstColon = [
            x.substring(0, x.indexOf(': ')),
            x.substring(x.indexOf(': ') + 2),
        ];
        if (splitOnFirstColon[0] == '')
            return { type: 'simple', data: x };
        else {
            var splitOnDots = splitOnFirstColon[1].split('. ');
            if (splitOnDots.length == 1)
                return { type: 'double', data: splitOnFirstColon };
            else
                return {
                    type: 'double_sublist',
                    data: [splitOnFirstColon[0], splitOnDots],
                };
        }
    });
}
//#endregion
//#region Dialogs
/** Create mat dialog showing its dependencies and other options... */
function dialog_Mat(code) {
    var e_23, _a, e_24, _b;
    var codeData = currentPensumMats[code];
    if (!codeData)
        return new DialogBox().setMsg('Informacion no disponible para ' + code);
    var dialog = new DialogBox();
    var outNode = dialog.contentNode;
    createElement(outNode, 'h3', "(" + codeData.codigo + ") '" + codeData.asignatura + "'");
    createElement(outNode, 'p', "Codigo: \t" + codeData.codigo);
    createElement(outNode, 'p', "Creditos: \t" + codeData.creditos);
    createElement(outNode, 'p', "Cuatrimestre: \t" + codeData.cuatrimestre);
    // Localizar en pensum
    if (filterMats([codeData]).length === 0) {
        createElement(outNode, 'a', 'Localizar en pensum', ['btn-secondary', 'btn-disabled']);
        createElement(outNode, 'span', 'Esta materia no está visible actualmente.', ['explanatory']);
    }
    else {
        var a = createElement(outNode, 'a', 'Localizar en pensum', ['btn-secondary']);
        a.addEventListener('click', function () {
            dialog.hide();
            var x = safeForHtmlId(codeData.codigo); // im lazy, this part was moved.
            var targetCell = document.getElementById("a_" + x);
            var targetRow = document.getElementById("r_" + x);
            targetCell.scrollIntoView({ block: 'center' });
            targetRow.classList.remove('highlightRow');
            targetRow.classList.add('highlightRow');
            setTimeout(function () { return targetRow.classList.remove('highlightRow'); }, 3e3);
        });
    }
    // Localizar en diagrama
    {
        var a = createElement(outNode, 'a', 'Localizar en diagrama (β)', ['btn-secondary']);
        a.addEventListener('click', function () {
            dialog.hide();
            dialog_OrgChart(codeData.codigo).show();
        });
    }
    if (codeData.prereq.length > 0 || codeData.prereqExtra.length > 0) {
        createElement(outNode, 'h4', 'Pre-requisitos');
        try {
            for (var _c = __values(codeData.prereq), _d = _c.next(); !_d.done; _d = _c.next()) {
                var code_1 = _d.value;
                outNode.appendChild(createMatBtn(dialog, code_1));
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_23) throw e_23.error; }
        }
        codeData.prereqExtra.forEach(function (x) {
            var p = createElement(outNode, 'p');
            var s = document.createElement('a');
            s.textContent = x;
            s.classList.add('preReq');
            s.classList.add('preReqExtra');
            p.appendChild(s);
        });
    }
    if (codeData.postreq.length > 0) {
        createElement(outNode, 'h4', 'Es pre-requisito de: ');
        try {
            for (var _e = __values(codeData.postreq), _f = _e.next(); !_f.done; _f = _e.next()) {
                var code_2 = _f.value;
                outNode.appendChild(createMatBtn(dialog, code_2));
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_24) throw e_24.error; }
        }
    }
    outNode.appendChild(dialog.createCloseButton());
    updatePrereqClasses(outNode);
    return dialog;
}
function dialog_ImportExport() {
    var dialog = new DialogBox();
    var node = dialog.contentNode;
    createElement(node, 'h3', 'Exportar/importar progreso');
    [
        'Las materias aprobadas seleccionadas se guardan localmente en la cache del navegador. ' +
            'Al estar guardados en la cache, estos datos podrian borrarse con una actualización. ',
        'Para evitar la perdida de estos datos, se recomienda exportar la seleccion como un archivo (<code>progreso.json</code>). ',
    ].forEach(function (x) { return createElement(node, 'p', x); });
    node.appendChild(document.createElement('br'));
    node.appendChild(createSecondaryButton('Exportar progreso.json', downloadProgress));
    node.appendChild(createSecondaryButton('Importar progreso.json', uploadProgress));
    node.appendChild(createSecondaryButton('Reiniciar selección', function () {
        if (confirm('Seguro que desea reiniciar la selección?')) {
            userProgress.passed = new Set();
            userProgress.onCourse = new Set();
            alert('Selección reiniciada.');
            dialog.hide();
            drawPensumTable();
        }
    }));
    node.appendChild(document.createElement('br'));
    createElement(node, 'h3', 'Descargar pensum en otros formatos');
    node.appendChild(createSecondaryButton("Descargar .xlsx (Excel)", downloadCurrentPensumAsExcel));
    node.appendChild(createSecondaryButton("[Para pruebas] Descargar .json", function () { return downloadPensumJson(currentPensumData); }, ['note']));
    node.appendChild(createSecondaryButton("[Para pruebas] Cargar desde .json", loadPensumFromJson, ['note']));
    node.appendChild(document.createElement('br'));
    node.appendChild(dialog.createCloseButton());
    return dialog;
}
function dialog_IndiceCuatrimestral() {
    var e_25, _a;
    var dialog = new DialogBox();
    var outNode = dialog.contentNode;
    createElement(outNode, 'h3', 'Calcular indice');
    var _b = analyseGradeProgress(userProgress), onCourseCreds = _b.onCourseCreds, passedCreds = _b.passedCreds, onCourseMats = __spread(userProgress.onCourse), matTracker = [], indiceCuat = {
        mats: 0,
        val: 0,
    }, indiceGlobal = {
        mats: 0,
        val: 3,
        newVal: 3,
    };
    if (onCourseCreds === 0) {
        outNode.append("\n            Para usar esta funcion, se necesita \n            seleccionar al menos una materia \n            como \"cursando\" (en amarillo).", dialog.createCloseButton());
        return dialog;
    }
    /* Create table with:
        - Code
        - Desc
        - Cr
        - Value (custom selector, limited to ABCDF, allow typing, only 1 character)
       On value update, recalculate all indexes.
       Calculate (approximated) global index by giving: current index + num of taken creds
    */
    var table = createElement(outNode, 'table'), thead = table.createTHead(), tbody = table.createTBody();
    table.style.width = '100%';
    // Head
    ['Codigo', 'Asignatura', 'Cr.', 'Grado']
        .forEach(function (x) { return createElement(thead, 'th', x); });
    var _loop_5 = function (code) {
        var mat = currentPensumMats[code];
        if (!mat)
            return "continue";
        var creds = mat.creditos, asignatura = mat.asignatura, value = 4, input = document.createElement('select'), row = tbody.insertRow(), outObj = { code: code, creds: creds, asignatura: asignatura, mat: mat, value: value, input: input, row: row };
        matTracker.push(outObj);
        // Row elements
        [createMatBtn(dialog, code, true), asignatura, creds.toString(), input]
            .forEach(function (x) { return row.insertCell().append(x); });
        // Input config
        [
            ['A', '4'],
            ['B', '3'],
            ['C', '2'],
            ['D', '1'],
            ['F', '0']
        ].forEach(function (x) {
            var opt = document.createElement('option');
            opt.textContent = x[0];
            opt.value = x[1];
            input.append(opt);
        });
        // Input change events
        input.onchange = function (evt) {
            outObj.value = parseInt(evt.target.value) || 0;
            updateIndiceCuat(); // Defined below
        };
    };
    try {
        // Rows
        for (var onCourseMats_1 = __values(onCourseMats), onCourseMats_1_1 = onCourseMats_1.next(); !onCourseMats_1_1.done; onCourseMats_1_1 = onCourseMats_1.next()) {
            var code = onCourseMats_1_1.value;
            _loop_5(code);
        }
    }
    catch (e_25_1) { e_25 = { error: e_25_1 }; }
    finally {
        try {
            if (onCourseMats_1_1 && !onCourseMats_1_1.done && (_a = onCourseMats_1.return)) _a.call(onCourseMats_1);
        }
        finally { if (e_25) throw e_25.error; }
    }
    updatePrereqClasses(tbody);
    createElement(outNode, 'hr');
    // Indice cuatrimestral
    var outWrapper = createElement(outNode, 'div', null, ['col2', 'form']);
    createElement(outWrapper, 'label', 'Índice cuatrimestral: ');
    var resultCuatNode = createElement(outWrapper, 'input', '#');
    resultCuatNode.setAttribute('disabled', '');
    // Global fn
    createElement(outWrapper, 'hr');
    outWrapper.append(createSecondaryButton('¿Como conseguir el índice acumulado exacto?', function () { return dialog_conseguirIndiceAcumulado(passedCreds, updateIndiceGlobalValues).show(); }, ['span2']));
    createElement(outWrapper, 'label', 'Horas PGA (créditos acumulados): ');
    var globalCreds = createElement(outWrapper, 'input');
    createElement(outWrapper, 'label', 'PGA (índice acumulado): ');
    var globalIndex = createElement(outWrapper, 'input');
    createElement(outWrapper, 'hr');
    createElement(outWrapper, 'label', 'Índice acumulado: ');
    var globalOutput = createElement(outWrapper, 'input', '#');
    globalOutput.setAttribute('disabled', '');
    // Global fn setup
    globalIndex.type = 'number';
    globalIndex.min = '0';
    globalIndex.max = '4';
    globalIndex.step = '0.01';
    globalIndex.value = '3';
    indiceGlobal.val = 3;
    globalIndex.oninput = function () {
        var x = parseFloat(globalIndex.value);
        if (x < 0)
            x = 0;
        if (x > 4)
            x = 4;
        globalIndex.value = x.toString();
        indiceGlobal.val = x;
        updateIndiceGlobal();
    };
    globalCreds.type = 'number';
    globalCreds.min = '0';
    globalCreds.step = '1';
    globalCreds.value = passedCreds.toString();
    indiceGlobal.mats = passedCreds;
    globalCreds.oninput = function () {
        var x = parseInt(globalCreds.value);
        if (x < 0)
            x = 0;
        globalCreds.value = x.toString();
        indiceGlobal.mats = x;
        updateIndiceGlobal();
    };
    // Run initial update()
    updateIndiceCuat();
    outNode.append(dialog.createCloseButton());
    dialog.onShow = function () { return matTracker[0].input.focus(); };
    return dialog;
    // Functions
    function updateIndiceCuat() {
        var _a = matTracker.reduce(function (cum, x) {
            cum.total += x.creds;
            cum.weightSum += x.creds * x.value;
            return cum;
        }, { total: 0, weightSum: 0 }), total = _a.total, weightSum = _a.weightSum;
        var val = (weightSum / total);
        resultCuatNode.value = val.toFixed(3);
        indiceCuat.mats = total;
        indiceCuat.val = val;
        updateIndiceGlobal();
        return val;
    }
    function updateIndiceGlobal() {
        var val = (indiceCuat.mats * indiceCuat.val + indiceGlobal.mats * indiceGlobal.val) / (indiceCuat.mats + indiceGlobal.mats);
        indiceGlobal.newVal = val;
        globalOutput.value = val.toFixed(3);
        console.log(indiceCuat, indiceGlobal);
        return val;
    }
    function updateIndiceGlobalValues(horas, puntosCalidad) {
        var pga = puntosCalidad / horas;
        if (pga < 0)
            pga = 0;
        if (pga > 4)
            pga = 4;
        globalIndex.value = pga.toString();
        indiceGlobal.val = pga;
        globalCreds.value = horas.toString();
        indiceGlobal.mats = horas;
        updateIndiceGlobal();
    }
}
function dialog_conseguirIndiceAcumulado(passedCreds, updateFn) {
    var dialog = new DialogBox();
    var node = dialog.contentNode;
    node.classList.add('alert-width');
    createElement(node, 'h3', 'Cómo conseguir el indice acumulado exacto');
    var ul = createElement(node, 'ol');
    [
        'Entrar a <a href="https://landing.unapec.edu.do/banner/">Banner</a>.',
        'En "Servicios academicos", ingresar a <a href="https://sso.unapec.edu.do/ssomanager/c/SSB?pkg=bwskotrn.P_ViewTermTran">"Histórico académico"</a>.',
        'En "Opciones de Histórico académico", seleccionar el "Nivel Hist Acad" a "GRADO", y luego click a "Enviar".',
        "Se le presenta un historial de todas las notas de todas las materias en todos los cuatrimestres.\n        Una vez aqu\u00ED, se debe bajar hasta que se encuentre la tabla \"TOTALES DE HIST\u00D3RICO ACAD\u00C9MICO (GRADO)\" (antes de la tabla \"CURSOS EN PROGRESO\").",
        'Copiar el valor de "Horas PGA" a esta pagina.',
        'Dividir "Puntos de Calidad" entre las "Horas PGA", y copiarlo en la entrada "PGA" de esta pagina.',
    ].forEach(function (x) { return createElement(ul, 'li', x); });
    // Update PGA form
    var outWrapper = createElement(node, 'div', null, ['form', 'col2']);
    createElement(outWrapper, 'hr');
    createElement(outWrapper, 'label', 'Horas PGA: ');
    var globalCreds = createElement(outWrapper, 'input');
    createElement(outWrapper, 'label', 'Puntos de Calidad: ');
    var globalIndex = createElement(outWrapper, 'input');
    createElement(outWrapper, 'hr');
    createElement(outWrapper, 'label', 'PGA: ');
    var globalOutput = createElement(outWrapper, 'input', '#');
    globalOutput.setAttribute('disabled', '');
    // Global fn setup
    globalIndex.type = 'number';
    globalIndex.min = '0';
    globalIndex.step = '1';
    globalIndex.value = (Math.round(passedCreds * (3 + Math.random()))).toString();
    globalIndex.oninput = function () {
        var puntos = parseInt(globalIndex.value);
        if (puntos < 0)
            puntos = 0;
        globalIndex.value = puntos.toString();
        updatePGA();
    };
    globalCreds.type = 'number';
    globalCreds.min = '0';
    globalCreds.step = '1';
    globalCreds.value = passedCreds.toString();
    globalCreds.oninput = function () {
        var horas = parseInt(globalCreds.value);
        if (horas < 0)
            horas = 0;
        globalCreds.value = horas.toString();
        updatePGA();
    };
    function updatePGA() {
        var horas = parseInt(globalCreds.value), puntos = parseInt(globalIndex.value);
        globalOutput.value = (puntos / horas).toString();
        if (puntos / horas > 4)
            globalOutput.classList.add('red');
        else
            globalOutput.classList.remove('red');
        return puntos / horas;
    }
    updatePGA();
    node.append(createSecondaryButton('Actualizar', function () {
        var horas = parseInt(globalCreds.value), puntos = parseInt(globalIndex.value);
        updateFn(horas, puntos);
        dialog.hide();
    }));
    node.append(dialog.createCloseButton());
    return dialog;
}
function dialog_OrgChart(selected) {
    if (selected === void 0) { selected = null; }
    var dialog = new DialogBox();
    var node = dialog.contentNode;
    // Title
    createElement(node, 'h3', currentPensumData.carrera || 'Diagrama de pensum');
    // Diagram
    var chartContainer = createElement(node, 'div');
    chartContainer.style.width = '90vw';
    chartContainer.style.height = '60vh';
    var options = createOrgChartOptions(function (evt, data) { return onWebTemplateRender(evt, data, dialog); }, selected);
    options.scale = orgChartSettings.scale;
    var control = primitives.FamDiagram(chartContainer, options);
    if (selected)
        control.update(primitives.UpdateMode.Refresh, true);
    window['control'] = control;
    // Zoom slider
    node.appendChild(document.createElement('br'));
    var sizeContainer = createElement(node, 'div');
    createElement(sizeContainer, 'span', 'Zoom: ');
    var size = createElement(sizeContainer, 'input');
    size.type = 'range';
    size.min = -4;
    size.max = 2;
    size.step = 0.01;
    size.value = Math.log(orgChartSettings.scale) / Math.log(2);
    size.style.width = '100%';
    var zoomFn = function () {
        var pVal = parseFloat(size.value);
        var newVal = Math.pow(2, pVal);
        control.setOption('scale', newVal);
        orgChartSettings.scale = newVal;
        control.update(primitives.UpdateMode.Refresh);
    };
    zoomFn = debounce(zoomFn, 10);
    size.addEventListener('input', zoomFn);
    // Buttons
    node.appendChild(createSecondaryButton("\uD83D\uDCC4 Descargar documento .pdf", function () { return downloadOrgChartPdf(); }));
    node.appendChild(createSecondaryButton("\uD83D\uDDBC Descargar imagen .png", function () { return downloadOrgChartPng(); }));
    node.appendChild(dialog.createCloseButton());
    // @ts-ignore
    var resizeObserver = new ResizeObserver(function () { return control.update(primitives.UpdateMode.Refresh); });
    resizeObserver.observe(node);
    dialog.onHide = function () {
        resizeObserver.disconnect();
        control.destroy();
    };
    dialog['control'] = control;
    return dialog;
}
//#endregion
//#region Org chart
function createOrgChartOptions(onTemplateRender, cursorItem) {
    if (onTemplateRender === void 0) { onTemplateRender = null; }
    if (cursorItem === void 0) { cursorItem = null; }
    // Generate orgchart
    var options = new primitives.FamConfig();
    var items = matsToOrgChart(currentPensumData.cuats.flat(), errorCodes);
    options = __assign(__assign({}, options), { pageFitMode: primitives.PageFitMode.None, items: items, 
        // Rendering
        arrowsDirection: primitives.GroupByType.Children, linesWidth: 3, linesColor: 'black', normalLevelShift: 30, lineLevelShift: 20, dotLevelShift: 20, alignBylevels: true, hideGrandParentsConnectors: true, 
        // templates
        templates: [getMatTemplate()], onItemRender: onTemplateRender, 
        // Buttons
        hasButtons: primitives.Enabled.True, buttonsPanelSize: 38, 
        // Extras
        hasSelectorCheckbox: primitives.Enabled.False, showCallout: false, cursorItem: cursorItem });
    return options;
}
function createOrgChartPdf() {
    var options = createOrgChartOptions(onPdfTemplateRender);
    var chart = primitives.FamDiagramPdfkit(__assign(__assign({}, options), { cursorItem: null, hasSelectorCheckbox: primitives.Enabled.False }));
    var chartSize = chart.getSize();
    var doc = new PDFDocument({
        size: [chartSize.width + 100, chartSize.height + 150]
    });
    var stream = doc.pipe(blobStream());
    doc.save();
    doc.fontSize(25).text("[" + currentPensumData.codigo + "] " + currentPensumData.carrera);
    chart.draw(doc, 30, 100);
    doc.restore();
    doc.end();
    return stream;
}
function createOrgChartPng(resize) {
    if (resize === void 0) { resize = 1.5; }
    return new Promise(function (resolve, reject) {
        var stream = createOrgChartPdf();
        if (stream == null)
            reject('Error: Failed to create file pdf!');
        stream.on('finish', function () {
            return __awaiter(this, void 0, void 0, function () {
                var blob, buffer, pdf, page, scale, viewport, canvas, context, task, png;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            blob = stream.toBlob('application/pdf');
                            return [4 /*yield*/, blob.arrayBuffer()];
                        case 1:
                            buffer = _a.sent();
                            return [4 /*yield*/, pdfjsLib.getDocument(buffer).promise];
                        case 2:
                            pdf = _a.sent();
                            console.log(pdf);
                            return [4 /*yield*/, pdf.getPage(1)];
                        case 3:
                            page = _a.sent();
                            scale = 1;
                            viewport = page.getViewport(scale).viewBox;
                            canvas = document.createElement('canvas');
                            document.body.appendChild(canvas);
                            context = canvas.getContext('2d');
                            canvas.width = resize * viewport[2];
                            canvas.height = resize * viewport[3];
                            // Flip before rendering
                            context.save();
                            context.translate(0, canvas.height);
                            context.scale(resize, -resize);
                            task = page.render({ canvasContext: context, viewport: viewport });
                            return [4 /*yield*/, task.promise];
                        case 4:
                            _a.sent();
                            context.restore();
                            png = canvas.toDataURL('image/png');
                            // Remove canvas
                            document.body.removeChild(canvas);
                            resolve(png);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
}
function downloadOrgChartPng(resize) {
    if (resize === void 0) { resize = 1.5; }
    createOrgChartPng(resize).then(function (png) {
        if (!png)
            return;
        var name = currentPensumData.codigo + '_' + getDateIdentifier();
        FileSaver.saveAs(png, name + '.png');
    }).catch(alert);
}
function downloadOrgChartPdf() {
    var stream = createOrgChartPdf();
    if (stream == null) {
        alert('Error: Failed to create file pdf!');
        return;
    }
    stream.on('finish', function () {
        var string = stream.toBlob('application/pdf');
        var name = currentPensumData.codigo + '_' + getDateIdentifier();
        FileSaver.saveAs(string, name + '.pdf');
    });
}
//#endregion
//#region OrgChart templates
function matsToOrgChart(mats, errorCodes) {
    if (errorCodes === void 0) { errorCodes = new Set(); }
    var o = [];
    for (var i = 0; i < mats.length; ++i) {
        var x = mats[i];
        var y = __assign({ id: x.codigo, parents: x.prereq || "base", primaryParent: x.prereq || null, 
            //relativeItem: mats[i - 1] || null,
            templateName: 'matTemplate', error: false }, x);
        o.push(y);
    }
    for (var i = 0, ec = __spread(errorCodes), l = ec.length; i < l; ++i) {
        var x = ec[i];
        var y = {
            id: x,
            parents: "base",
            templateName: 'matTemplate',
            asignatura: '???',
            codigo: x,
            creditos: '0',
            cuatrimestre: '???',
            error: true,
        };
        o.push(y);
    }
    return o;
}
function onWebTemplateRender(event, data, dialog) {
    var _a;
    if (data.templateName != "matTemplate")
        return;
    var itemConfig = data.context, e = data.element, en = function (name) { return getElementByName(e, name); }, comp = 'c_' + safeForHtmlId(itemConfig.codigo), removeOld = []; // Remove old classes, since this OrgChart lib reuses elements
    switch (data.renderingMode) {
        case primitives.RenderingMode.Create:
            /* Initialize template content here */
            break;
        case primitives.RenderingMode.Update:
            /* Update template content here */
            break;
    }
    e.onclick = function () {
        dialog.hide();
        dialog_Mat(itemConfig.codigo).show();
    };
    for (var i = 0, l = e.classList.length; i < l; ++i) {
        if (/c_.{2,}/.test(e.classList[i]) && comp !== e.classList[i]) {
            removeOld.push(e.classList[i]);
        }
    }
    (_a = e.classList).remove.apply(_a, __spread(removeOld));
    e.classList.add(comp);
    updatePrereqClassesSingle(e);
    // var titleBackground = en('titleBackground'); //data.element.firstChild;
    // titleBackground.style.backgroundColor = primitives.Colors.RoyalBlue;//itemConfig.itemTitleColor || primitives.Colors.RoyalBlue;
    en('title').textContent = itemConfig.asignatura;
    en('codigo').textContent = '[' + itemConfig.codigo + ']';
    en('cred_top').textContent = itemConfig.creditos.toString();
    en('cred_top').setAttribute('value', itemConfig.creditos.toString());
    en('creditos').textContent = 'Cuatrim.: ' + itemConfig.cuatrimestre;
}
function onPdfTemplateRender(doc, pos, data) {
    var itemConfig = data.context;
    if (data.templateName != "matTemplate")
        return;
    var contentSize = new primitives.Size(200, 100);
    // Container box color
    var code = itemConfig.codigo;
    var statusColor;
    if (userProgress.passed.has(code))
        statusColor = '#e6ffe8'; // Green
    else if (userProgress.onCourse.has(code))
        statusColor = '#fff9de'; // Yellow
    else if (errorCodes.has(code))
        statusColor = '#ff4444'; // Red (error)
    else
        statusColor = '#f2f9ff'; // Default Blue
    // Container box
    doc.roundedRect(pos.x, pos.y, pos.width, pos.height, 5)
        .fill(statusColor);
    doc.roundedRect(pos.x + 0.5, pos.y + 0.5, pos.width - 1, pos.height - 1, 5)
        .lineWidth(1)
        .stroke('#dddddd');
    // Credito value
    var credValue = {
        0: '#eb9cff',
        1: '#c5f25c',
        2: '#ffc773',
        3: '#f57936',
        def: '#cf1f1f'
    };
    doc.polygon([pos.x + pos.width - 30, pos.y], [pos.x + pos.width, pos.y], [pos.x + pos.width, pos.y + 30]).fill(credValue[itemConfig.creditos] || credValue['def']);
    doc.fillColor('white')
        .font('Helvetica', 12)
        .text(itemConfig.creditos, pos.x + pos.width - 12, pos.y + 7, {
        ellipsis: false,
        width: 10,
        height: 1,
        align: 'right'
    });
    // Codigo
    doc.fillColor('black')
        .font('Helvetica', 14)
        .text("[" + itemConfig.codigo + "]", pos.x + 7, pos.y + 7, {
        ellipsis: false,
        width: (contentSize.width - 7 - 7),
        height: 16,
        align: 'center'
    });
    // Title (asignatura)
    doc.fillColor('black')
        .font('Helvetica', 18)
        .text(itemConfig.asignatura, pos.x + 7, pos.y + 7 + 16 + 5, {
        ellipsis: false,
        width: (contentSize.width - 7 - 7),
        height: 60,
        align: 'center'
    });
    doc.restore;
}
function getElementByName(parent, name) {
    return parent.querySelector("[name = " + name + "]");
}
function getMatTemplate() {
    var result = new primitives.TemplateConfig();
    result.name = "matTemplate";
    result.itemSize = new primitives.Size(200, 100);
    result.minimizedItemSize = new primitives.Size(3, 3);
    /* the following example demonstrates JSONML template see http://http://www.jsonml.org/ for details: */
    result.itemTemplate = ["div",
        {
            "style": {
                "width": result.itemSize.width + "px",
                "height": result.itemSize.height + "px"
            },
            "class": ["bp-item", "bp-corner-all", "c__", "preReq"]
        },
        ["div",
            {
                "name": "cred_top",
                "class": ["bp-cred"],
            }
        ],
        ["div",
            {
                "name": "codigo",
                "class": ["bp-txt", "monospace"],
                "style": {
                    fontSize: "12px",
                    margin: "0 .5em",
                    "text-align": "center",
                }
            }
        ],
        ["div",
            {
                "name": "title",
                "class": ["bp-title", "bp-head", "monospace"],
                "style": {
                    width: "100%",
                    margin: ".5em .5em 0",
                }
            }
        ],
        ["div",
            {
                "name": "creditos",
                "class": ["bp-txt"],
                "style": {
                    fontSize: "12px",
                    margin: "0 .5em",
                }
            }
        ],
        ["div",
            {
                "name": "cuatrimestre",
                "class": ["bp-txt"],
                "style": {
                    fontSize: "12px",
                    margin: "0 .5em",
                }
            }
        ],
    ];
    return result;
}
//#region LocalStorage Funcs
/** Creates a SaveObject */
function createSaveObject() {
    return {
        saveVer: saveVer,
        currentCodeAtInputForm: document.getElementById('codigoMateria').value,
        userData: {
            passed: __spread(userProgress.passed),
            onCourse: __spread(userProgress.onCourse),
        },
        filterMode: __assign({}, filterMode),
        selectMode: userSelectMode,
    };
}
/** Loads a SaveObject from saveToObject */
function loadFromObject(obj) {
    document.getElementById('codigoMateria').value =
        obj.currentCodeAtInputForm;
    // Up to SaveVer 4
    if (obj.progress)
        userProgress.passed = new Set(obj.progress);
    // > SaveVer 5
    if (obj.userData) {
        var ud = obj.userData;
        if (ud.passed)
            userProgress.passed = new Set(ud.passed);
        if (ud.onCourse)
            userProgress.onCourse = new Set(ud.onCourse);
        //if (ud.selected) userProgress.selected = new Set(ud.selected);
    }
    if (obj.filterMode)
        Object.assign(filterMode, obj.filterMode);
    // Check invalid selectModes
    var enumLastVal = Object.keys(SelectMode).length / 2;
    if (obj.selectMode && obj.selectMode < enumLastVal)
        userSelectMode = obj.selectMode;
    return true;
}
function saveToLocalStorage() {
    var out = createSaveObject();
    if (!SAVE_TO_LOCALSTORAGE)
        return false;
    try {
        localStorage.setItem(SAVE_DATA_LOCALSTORAGE, JSON.stringify(out));
        return true;
    }
    catch (err) {
        console.warn('Could not save saveData to localStorage');
        console.warn(err);
        return false;
    }
}
function loadFromLocalStorage() {
    var saveData = localStorage.getItem(SAVE_DATA_LOCALSTORAGE);
    if (saveData === null)
        return false;
    var out = JSON.parse(saveData);
    loadFromObject(out);
    // Version management and cache clearing.
    if (out.saveVer !== saveVer) {
        console.info("Updated from " + out.saveVer + " to version " + saveVer + ".");
        localStorage.clear();
    }
    return true;
}
//#endregion
//#region Helper functions
/**
 *
 * @param {String} url address for the HTML to fetch
 * @param {String} cacheOpt cache policy, defaults to force-cache,
 * but if cache must be reloaded, do 'relaod'.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
 * @return {String} the resulting HTML string fragment
 */
function fetchHtmlAsText(url, opts, forceProxy, currentProxyCallback) {
    if (opts === void 0) { opts = {}; }
    if (forceProxy === void 0) { forceProxy = -1; }
    if (currentProxyCallback === void 0) { currentProxyCallback = null; }
    return __awaiter(this, void 0, void 0, function () {
        var corsOverride, i, currProxy, controller, signal, timeoutId, sendDate, currUrl, response, recieveDate, err_1, recieveDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    corsOverride = [
                        '',
                        'https://api.allorigins.win/raw?url=',
                        'https://yacdn.org/serve/',
                        'https://cors-anywhere.herokuapp.com/',
                        'https://crossorigin.me/',
                        'https://cors-proxy.htmldriven.com/?url=',
                        'https://thingproxy.freeboard.io/fetch/',
                        'http://www.whateverorigin.org/get?url=',
                    ];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < corsOverride.length)) return [3 /*break*/, 10];
                    currProxy = corsOverride[i];
                    if (forceProxy !== -1) {
                        if (typeof forceProxy == 'number')
                            currProxy = corsOverride[forceProxy];
                        else
                            currProxy = forceProxy;
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 9]);
                    controller = new AbortController();
                    signal = controller.signal;
                    opts.signal = signal;
                    timeoutId = setTimeout(function () {
                        controller.abort();
                        console.warn('Timed out!');
                    }, 4e3);
                    sendDate = new Date().getTime();
                    currUrl = currProxy + url;
                    return [4 /*yield*/, fetch(currUrl, opts)];
                case 3:
                    response = _a.sent();
                    if (currentProxyCallback)
                        currentProxyCallback('request', currProxy, i);
                    clearTimeout(timeoutId);
                    if (!response.ok) return [3 /*break*/, 5];
                    recieveDate = new Date().getTime();
                    console.info("CORS proxy '" + currUrl + "' succeeded in " + (recieveDate - sendDate) + " ms.'");
                    if (currentProxyCallback)
                        currentProxyCallback('success', currProxy, i);
                    return [4 /*yield*/, response.text()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: throw 'Response was not OK!';
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_1 = _a.sent();
                    clearTimeout(timeoutId);
                    recieveDate = new Date().getTime();
                    console.warn("CORS proxy '" + currProxy + "' failed in " + (recieveDate - sendDate) + "ms.'");
                    console.warn(err_1);
                    if (currentProxyCallback)
                        currentProxyCallback('error', currProxy, i);
                    return [3 /*break*/, 9];
                case 8:
                    ++i;
                    return [7 /*endfinally*/];
                case 9: return [3 /*break*/, 1];
                case 10: return [2 /*return*/, null];
            }
        });
    });
}
function titleCase(string) {
    var sentence = string.toLowerCase().split(' ');
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
}
function sentenceCase(string) {
    var sentence = string.toLowerCase();
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * Extracted from https://davidwalsh.name/javascript-debounce-function.
 * @param func
 * @param wait Delay time, in ms.
 * @param immediate If true, trigger the function on the leading edge, instead of the trailing.
 * @returns
 */
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
;
/** Simple class that creates a full-screen node */
var DialogBox = /** @class */ (function () {
    function DialogBox() {
        var _this = this;
        this.onHide = null;
        this.onShow = null;
        this.wrapperNode = document.createElement('div');
        this.wrapperNode.classList.add('fullscreen');
        this.wrapperNode.classList.add('dialogWrapper');
        this.contentNode = document.createElement('div');
        this.contentNode.classList.add('dialogCard');
        this.wrapperNode.appendChild(this.contentNode);
        this.wrapperNode.addEventListener('click', function (evt) {
            if (evt.target === _this.wrapperNode) {
                _this.hide();
            }
        });
        return this;
    }
    /** Sets the contentNode to a single <p> element with the given text. */
    DialogBox.prototype.setMsg = function (str) {
        createElement(this.contentNode, 'p', str);
        this.contentNode.appendChild(this.createCloseButton());
        return this;
    };
    /** Adds the wrapperNode to the document, thus showing the DialogBox. */
    DialogBox.prototype.show = function () {
        document.body.appendChild(this.wrapperNode);
        if (this.onShow && typeof this.onShow == 'function')
            this.onShow.call();
        return this;
    };
    /** Removes the wrapperNode from the document, thus hiding the DialogBox. */
    DialogBox.prototype.hide = function () {
        document.body.removeChild(this.wrapperNode);
        if (this.onHide && typeof this.onHide == 'function')
            this.onHide.call();
        return this;
    };
    /** Creates a generic 'close' button that can be appended to contentNode. */
    DialogBox.prototype.createCloseButton = function () {
        var _this = this;
        var a = document.createElement('a');
        a.textContent = 'Cerrar';
        a.addEventListener('click', function () { return _this.hide(); });
        a.classList.add('btn-primary');
        return a;
    };
    return DialogBox;
}());
function downloadObjectAsJson(exportObj, exportNameWithoutExt) {
    var blob = new Blob([JSON.stringify(exportObj)], {
        type: 'data:text/json;charset=utf-8',
    });
    FileSaver.saveAs(blob, exportNameWithoutExt + '.json');
}
function createElement(parentNode, tag, innerHTML, classes) {
    var _a;
    if (parentNode === void 0) { parentNode = null; }
    if (tag === void 0) { tag = 'div'; }
    if (innerHTML === void 0) { innerHTML = null; }
    if (classes === void 0) { classes = []; }
    var x = document.createElement(tag);
    if (parentNode)
        parentNode.appendChild(x);
    if (innerHTML !== null)
        x.innerHTML = innerHTML;
    if (classes.length)
        (_a = x.classList).add.apply(_a, __spread(classes));
    return x;
}
function createBr(parentNode) {
    if (parentNode === void 0) { parentNode = null; }
    var x = document.createElement('br');
    if (parentNode)
        parentNode.appendChild(x);
    return x;
}
function createSecondaryButton(text, callback, classes) {
    var _a;
    if (classes === void 0) { classes = []; }
    var a = document.createElement('a');
    a.addEventListener('click', callback);
    a.innerHTML = text;
    (_a = a.classList).add.apply(_a, __spread(['btn-secondary'], classes));
    return a;
}
function findAllpostreqs(code) {
    function subFindArr(code) {
        var e_26, _a;
        var hideList = [code];
        try {
            for (var _b = __values(currentPensumMats[code].postreq), _c = _b.next(); !_c.done; _c = _b.next()) {
                var x = _c.value;
                hideList.push.apply(hideList, __spread(subFindArr(x)));
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_26) throw e_26.error; }
        }
        return hideList;
    }
    // Set to remove duplicates.
    return __spread(new Set(subFindArr(code)));
}
/** Replaces spaces to underscores. */
function safeForHtmlId(str) {
    return str.replace(/ /g, '_');
}
//#endregion
//#region Init
/** This function is called by the <search> button */
function loadPensum(customPensum) {
    var _a;
    if (customPensum === void 0) { customPensum = null; }
    return __awaiter(this, void 0, void 0, function () {
        var infoWrap, codigoMateriaInput, clearInfoWrap, setInfoWrap, carr, rpci, rpc, rpcn, rpcn_r, x, loadedFromCustomPensum, pResponse, obj, e_27, pensumNode, newCode, h, t0, btnwrp, a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    infoWrap = document.getElementById('infoWrapper');
                    codigoMateriaInput = document.getElementById('codigoMateria');
                    currentPensumCode = codigoMateriaInput.value.trim().toUpperCase();
                    clearInfoWrap = function () {
                        infoWrap.innerHTML = '';
                    };
                    setInfoWrap = function (str) {
                        infoWrap.innerHTML = str;
                    };
                    if (currentPensumCode === '') {
                        carr = CARRERAS.slice(0, 16);
                        rpci = Math.round(Math.random() * (carr.length - 1));
                        rpc = (_a = carr[rpci]) !== null && _a !== void 0 ? _a : { codigo: "DIG10", nombre: "LICENCIATURA EN DISEÑO GRAFICO", escuela: "Decanato de Artes y Comunicación" };
                        rpcn = rpc.nombre.split(' ').filter(function (x) { return !['LICENCIATURA', 'EN', 'DE', 'INGENIERIA', '[Antiguo]'].includes(x); }).join(' ');
                        rpcn_r = rpcn.slice(0, Math.round(rpcn.length * (0.7 + 0.25 * (Math.random() - 0.3)))) + '...';
                        x = [
                            "<b>Favor inserte un codigo de pensum (ej " + rpc.codigo + ").</b>",
                            'Tambien puede empezar a escribir el nombre de la carrera ' +
                                ("(" + rpcn_r + "), ") +
                                'y aparecerá un listado con las distintas carreras y sus respectivos códigos.',
                            '<span>Una vez cargado el pensum, no tenga miedo de dar click en todos los botones para ver que hacen!',
                            'Click en cualquier codigo de materia ' +
                                '(ej. <span class="monospace">MAT101</span>) para ver más detalles de la materia.</span>'
                        ];
                        setInfoWrap('<ul>' + x.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>');
                        return [2 /*return*/];
                    }
                    loadedFromCustomPensum = false;
                    if (!customPensum) return [3 /*break*/, 1];
                    // LOAD FROM LOCAL FILE
                    if (customPensum.carrera
                        && customPensum.codigo
                        && customPensum.cuats) {
                        currentPensumData = customPensum;
                        loadedFromCustomPensum = true;
                        console.info(customPensum.codigo + ' loaded from local import (.json).');
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 10];
                case 1:
                    // LOAD FROM INTERNET
                    // try to check if its on localStorage, else check online and cache if successful.
                    setInfoWrap("Buscando " + currentPensumCode + " en cache local.");
                    currentPensumData = getPensumFromLocalStorage(currentPensumCode);
                    if (!(currentPensumData === null || !currentPensumData['version'] || currentPensumData.version < CURRENT_PENSUM_VERSION)) return [3 /*break*/, 9];
                    currentPensumData = null;
                    // Try from ./pensum first
                    setInfoWrap("Buscando " + currentPensumCode + " en versiones de respaldo.");
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch('./pensum/' + currentPensumCode + '.json')];
                case 3:
                    pResponse = _b.sent();
                    return [4 /*yield*/, pResponse.json()];
                case 4:
                    obj = _b.sent();
                    if (obj !== null && obj['version']) {
                        currentPensumData = convertSaveToPensum(obj);
                        console.info(currentPensumCode + ' found inside ./pensum/!');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    e_27 = _b.sent();
                    console.info(currentPensumCode + ' not found inside ./pensum/...');
                    return [3 /*break*/, 6];
                case 6:
                    if (!!currentPensumData) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetchPensumTable(currentPensumCode, function (returnCode, proxy, index) {
                            var n = index + 1;
                            switch (returnCode) {
                                case 'success':
                                    setInfoWrap("Pensum " + currentPensumCode + " encontrado en " + proxy + " (intento " + n + ")");
                                    break;
                                case 'request':
                                    setInfoWrap("Buscando pensum " + currentPensumCode + " en " + proxy + " (intento " + n + ")");
                                    break;
                                case 'error':
                                    setInfoWrap("Error en " + proxy + " (intento " + n + ")");
                                    break;
                                default:
                                    setInfoWrap("??? (" + proxy + ") (intento " + n + ")");
                                    break;
                            }
                        })];
                case 7:
                    pensumNode = _b.sent();
                    currentPensumData = extractPensumData(pensumNode);
                    _b.label = 8;
                case 8:
                    // Update cache and currentPensumCode if successfuly fetched.
                    if (currentPensumData) {
                        newCode = currentPensumData.codigo;
                        codigoMateriaInput.value = newCode;
                        currentPensumCode = newCode;
                        setPensumToLocalStorage(currentPensumData);
                    }
                    return [3 /*break*/, 10];
                case 9:
                    console.info(currentPensumData.codigo + ' loaded from localStorage.');
                    _b.label = 10;
                case 10:
                    // If data was succesfully found
                    if (currentPensumData) {
                        // Set the search bar
                        currentPensumMats = matsToDict(currentPensumData.cuats.flat());
                        codigoMateriaInput.value = currentPensumData.codigo;
                        // Display the table
                        drawPensumTable();
                        // Set 'Detalles de la carrera'
                        {
                            clearInfoWrap();
                            h = document.createElement('h3');
                            h.textContent = 'Detalles de la carrera: ';
                            infoWrap.appendChild(h);
                            infoWrap.appendChild(createInfoList(currentPensumData));
                            t0 = 'Recuerde guardar una copia de su selección en su disco local (o en las nubes).';
                            createElement(infoWrap, 'p', t0, ['note']);
                            btnwrp = createElement(infoWrap, 'div', '', ['inline-btn-wrapper']);
                            a = createElement(btnwrp, 'a', '', ['btn-secondary']);
                            a.href = unapecPensumUrl + currentPensumCode;
                            a.target = '_blank';
                            a.textContent = '🌐 Ver pensum original';
                            if (loadedFromCustomPensum)
                                a.classList.add('disabled');
                            btnwrp.appendChild(createSecondaryButton('💾 Guardar/Cargar selección', function () {
                                return dialog_ImportExport().show();
                            }));
                            btnwrp.appendChild(createSecondaryButton('🌳 Diagrama (β)', function () {
                                return dialog_OrgChart().show();
                            }));
                            return [2 /*return*/, currentPensumData.cuats.flat().length];
                        }
                    }
                    else {
                        infoWrap.textContent = 'No se ha encontrado el pensum!';
                        clearPensumTable();
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function drawPensumTable() {
    var wrapper = document.getElementById('pensumWrapper');
    var div = document.createElement('div');
    {
        var h = document.createElement('h1');
        h.textContent = currentPensumData.carrera;
        div.appendChild(h);
    }
    div.appendChild(createPensumTable(currentPensumData));
    if (wrapper.firstChild)
        wrapper.replaceChild(div, wrapper.firstChild);
    else
        wrapper.appendChild(div);
}
function clearPensumTable() {
    var wrapper = document.getElementById('pensumWrapper');
    while (wrapper.firstChild)
        wrapper.removeChild(wrapper.firstChild);
}
function convertPensumToSave(data) {
    var newCuats = data.cuats.map(function (cuat) {
        return cuat.map(function (mat) {
            var newMat = __assign({}, mat);
            delete newMat.cuatrimestre;
            if (!newMat.prereq.length)
                delete newMat.prereq;
            else if (newMat.prereq.length === 1) {
                newMat.prereq = newMat.prereq[0];
            }
            if (!newMat.prereqExtra.length)
                delete newMat.prereqExtra;
            else if (newMat.prereqExtra.length === 1) {
                newMat.prereqExtra = newMat.prereqExtra[0];
            }
            return newMat;
        });
    });
    return __assign(__assign({}, data), { cuats: newCuats });
}
function convertSaveToPensum(data) {
    var newCuats = [];
    var _loop_6 = function (i, l) {
        newCuats.push(data.cuats[i].map(function (mat) {
            var newMat = __assign({}, mat);
            newMat.cuatrimestre = i + 1;
            if (newMat.prereq === undefined)
                newMat.prereq = [];
            else if (typeof newMat.prereq === 'string')
                newMat.prereq = [newMat.prereq];
            if (newMat.prereqExtra === undefined)
                newMat.prereqExtra = [];
            else if (typeof newMat.prereqExtra === 'string')
                newMat.prereqExtra = [newMat.prereqExtra];
            return newMat;
        }));
    };
    for (var i = 0, l = data.cuats.length; i < l; ++i) {
        _loop_6(i, l);
    }
    return __assign(__assign({}, data), { cuats: newCuats });
}
function setPensumToLocalStorage(data) {
    try {
        var code = 'cache_' + data.codigo;
        var d = convertPensumToSave(data);
        var json = JSON.stringify(d);
        window.localStorage.setItem(code, json);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function getPensumFromLocalStorage(pensumCode) {
    try {
        var code = 'cache_' + pensumCode;
        var json = window.localStorage.getItem(code);
        var p = JSON.parse(json);
        return convertSaveToPensum(p);
    }
    catch (_a) {
        return null;
    }
}
function downloadPensumJson(data) {
    downloadObjectAsJson(convertPensumToSave(data), data.codigo);
}
function getDateIdentifier() {
    var d = new Date();
    return "" + d.getFullYear() + d.getMonth() + d.getDate() + "_" + d.getHours() + "h" + d.getMinutes() + "m" + d.getSeconds() + "s";
}
function loadPensumFromJson() {
    var _this = this;
    var input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', function () {
        var ext = input.files[0]['name']
            .substring(input.files[0]['name'].lastIndexOf('.') + 1)
            .toLowerCase();
        if (input.files && input.files[0] && ext == 'json') {
            var reader = new FileReader();
            reader.onload = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var txt, obj, p, numMatsLoaded, t, e_28, t;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            txt = e.target.result;
                            obj = JSON.parse(txt);
                            if (!(obj && typeof (obj) === 'object')) return [3 /*break*/, 2];
                            p = convertSaveToPensum(obj);
                            return [4 /*yield*/, loadPensum(p)];
                        case 1:
                            numMatsLoaded = _a.sent();
                            if (numMatsLoaded) {
                                t = numMatsLoaded + " materias cargadas.";
                                if (errorCodes.size) {
                                    t += "\n" + errorCodes.size + " materias no presentes!: \n";
                                    t += errorCodesLog.map(function (x) { return '    ' + x[0] + ' (prerequisito de ' + x[1] + ')'; }).join('\n');
                                }
                                alert(t);
                            }
                            else {
                                alert('Formato incorrecto!');
                            }
                            return [2 /*return*/];
                        case 2: throw 'No hay información dentro del .json!';
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            e_28 = _a.sent();
                            t = 'No se pudo cargar el archivo!';
                            alert(t + '\n' + e_28.toString());
                            console.warn(t);
                            console.warn(e_28);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            reader.readAsText(input.files[0]);
        }
        else {
            console.info('progress.json file could not be uploaded.');
        }
    });
}
function downloadProgress() {
    var obj = createSaveObject();
    var date = getDateIdentifier();
    var name = "materias-aprobadas_" + date;
    downloadObjectAsJson(obj, name);
}
function uploadProgress() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', function () {
        var ext = input.files[0]['name']
            .substring(input.files[0]['name'].lastIndexOf('.') + 1)
            .toLowerCase();
        if (input.files && input.files[0] && ext == 'json') {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var txt = e.target.result;
                    var obj = JSON.parse(txt);
                    if (obj) {
                        if (Array.isArray(obj)) {
                            userProgress.passed = new Set(obj);
                            loadPensum();
                            alert("Se han seleccionado " + userProgress.passed.size + " materias de " + input.files[0].name + ".");
                            return;
                        }
                        if (typeof (obj) === 'object') {
                            loadFromObject(obj);
                            loadPensum();
                            alert("Se han seleccionado " + userProgress.passed.size + " materias de " + input.files[0].name + ".");
                            return;
                        }
                    }
                    else {
                        throw 'No hay información dentro del .json!';
                    }
                }
                catch (e) {
                    var t = 'No se pudo cargar el archivo!';
                    alert(t + '\n' + e.toString());
                    console.warn(t);
                    console.warn(e);
                }
            };
            reader.readAsText(input.files[0]);
        }
        else {
            console.info('progress.json file could not be uploaded.');
        }
    });
}
function RESET_PROGRESS() {
    SAVE_TO_LOCALSTORAGE = false;
    localStorage.removeItem(SAVE_DATA_LOCALSTORAGE);
    location.reload();
}
function updateMigrate() {
    document.getElementById('codigoMateria').classList.add('hidden');
    document.getElementById('cargar_btn').classList.add('hidden');
    document.getElementById('recargar_btn').classList.add('hidden');
    document.querySelector('label').classList.add('hidden');
    if (!currentPensumData) {
        document.getElementById('infoWrapper').classList.add('hidden');
        document.getElementById('toolboxWrapper').classList.add('hidden');
        return;
    }
    ;
    var node = document.getElementById('migrate');
    var x;
    createElement(node, 'h2', 'Para migrar: ');
    var liNode = createElement(node, 'ol');
    // 1.
    x = createElement(liNode, 'li');
    x.append('Ir a ', createSecondaryButton('💾 Guardar/Cargar selección', function () {
        return dialog_ImportExport().show();
    }, ['inline']), ' y exportar un archivo con su seleccion actual (', createSecondaryButton('Exportar progreso.json', downloadProgress, ['inline']), ').');
    // 2.
    x = createElement(liNode, 'li');
    var a = document.createElement('a');
    a.textContent = 'scydact.github.io/pensum-extractor/';
    a.href = 'https://scydact.github.io/pensum-extractor/';
    x.append('Acceder a ', a, '.');
    // 3.
    createElement(liNode, 'li', 'En la nueva URL, volver a cargar el pensum su carrera (entrar el codigo de carrera).');
    x = createElement(liNode, 'li');
    x.append('Para volver a cargar sus selecciones, click a ', createSecondaryButton('💾 Guardar/Cargar selección', function () { }, ['inline']), ', luego click en ', createSecondaryButton('Exportar progreso.json', function () { }, ['inline']), ' y subir el archivo generado anteriormente (extensión .json).');
}
function onWindowLoad() {
    return __awaiter(this, void 0, void 0, function () {
        var a, b, carr, input, list, _a, tempIgnored, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    {
                        a = document.getElementById('versionSpan');
                        b = document.getElementById('saveVersionSpan');
                        if (a)
                            a.textContent = jsVer.toString();
                        if (b)
                            b.textContent = saveVer.toString();
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('carreras.json')];
                case 2: return [4 /*yield*/, (_c.sent()).json()];
                case 3:
                    carr = _c.sent();
                    if (carr && carr.carreras) {
                        CARRERAS = __spread(carr.carreras);
                    }
                    input = document.getElementById('codigoMateria');
                    list = CARRERAS.map(function (x) { return [
                        "(" + x.codigo + ") " + x.nombre,
                        x.codigo,
                    ]; });
                    // from awesomplete.min.js
                    new Awesomplete(input, { minChars: 0, list: list });
                    return [3 /*break*/, 5];
                case 4:
                    _a = _c.sent();
                    console.warn('carreras.json could not be loaded.\n Search autocomplete will not be available.');
                    return [3 /*break*/, 5];
                case 5:
                    _c.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, fetch('ignoredMats.json')];
                case 6: return [4 /*yield*/, (_c.sent()).json()];
                case 7:
                    tempIgnored = _c.sent();
                    if (tempIgnored)
                        allIgnored = tempIgnored;
                    return [3 /*break*/, 9];
                case 8:
                    _b = _c.sent();
                    console.warn('ignoredMats.json could not be loaded.');
                    return [3 /*break*/, 9];
                case 9:
                    // Associate input with Enter.
                    document.getElementById('codigoMateria').addEventListener('keyup', function (e) {
                        if (e.key === 'Enter')
                            loadPensum();
                    });
                    // Associate input with click.
                    document.getElementById('cargar_btn').addEventListener('click', function (e) {
                        loadPensum();
                    });
                    document.getElementById('recargar_btn').addEventListener('click', function (e) {
                        var r1 = 'cache_' + document.getElementById('codigoMateria').textContent;
                        var r2 = 'cache_' + currentPensumData.codigo;
                        localStorage.removeItem(r1);
                        console.info('Removed ' + r1);
                        localStorage.removeItem(r2);
                        console.info('Removed ' + r2);
                        setTimeout(loadPensum, 200);
                    });
                    // Try to get saved data
                    loadFromLocalStorage();
                    // Load toolbox
                    createToolbox();
                    // Do first load
                    loadPensum();
                    // UPDATE MIGRATE WARNING!
                    updateMigrate();
                    return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('load', onWindowLoad);
window.addEventListener('beforeunload', function (event) {
    saveToLocalStorage();
});
//#endregion
//# sourceMappingURL=main.js.map