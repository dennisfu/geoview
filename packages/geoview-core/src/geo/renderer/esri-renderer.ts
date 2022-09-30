/* eslint-disable no-console */
import { asString } from 'ol/color';
import {
  isFilledPolygonVectorConfig,
  isIconSymbolVectorConfig,
  isLineStringVectorConfig,
  isSimpleSymbolVectorConfig,
  TypeClassBreakStyleConfig,
  TypeClassBreakStyleInfo,
  TypeFillStyle,
  TypePolygonVectorConfig,
  TypeIconSymbolVectorConfig,
  TypeKinfOfSymbolVectorSettings,
  TypeLineStyle,
  TypeLineStringVectorConfig,
  TypeSimpleStyleConfig,
  TypeSimpleSymbolVectorConfig,
  TypeStyleConfig,
  TypeStyleConfigKey,
  TypeSymbol,
  TypeUniqueValueStyleConfig,
  TypeUniqueValueStyleInfo,
  TypeLayerEntryConfig,
} from '../map/map-schema-types';

/*
 * This file contains a partial implementation of the ESRI renderer types.
 */
export type EsriRendererTypes = 'uniqueValue' | 'simple' | 'classBreaks';

export type EsriBaseRenderer = {
  type: EsriRendererTypes;
};

type TypeEsriColor = [number, number, number, number];

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriUniqueValueRenderer if the type attribute of the
 * verifyIfRenderer parameter is 'uniqueValue'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const esriRendererIsUniqueValue = (verifyIfRenderer: EsriBaseRenderer): verifyIfRenderer is EsriUniqueValueRenderer => {
  return verifyIfRenderer.type === 'uniqueValue';
};

export interface EsriUniqueValueRenderer extends EsriBaseRenderer {
  type: 'uniqueValue';
  defaultLabel: string;
  defaultSymbol: EsriSymbol;
  field1: string;
  field2: string;
  field3: string;
  fieldDelimiter: string;
  rotationType: 'arithmetic' | 'geographic';
  uniqueValueInfos: EsriUniqueValueInfo[];
}

export type EsriUniqueValueInfo = {
  description: string;
  label: string;
  symbol: EsriSymbol;
  value: string;
};

export type EsriSymbol = EsriBaseSymbol | EsriSimpleMarkerSymbol | EsriSimpleLineSymbol | EsriPictureMarkerSymbol;

export type EsriBaseSymbol = {
  type: 'esriSMS' | 'esriSLS' | 'esriPMS' | 'esriSFS';
};

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleMarkerSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSMS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isSimpleMarkerSymbol = (verifyIfSymbol: EsriBaseSymbol): verifyIfSymbol is EsriSimpleMarkerSymbol => {
  return verifyIfSymbol.type === 'esriSMS';
};

export interface EsriSimpleMarkerSymbol extends EsriBaseSymbol {
  angle: number;
  color: TypeEsriColor;
  outline: EsriSimpleLineSymbol;
  size: number;
  style: EsriSymbolStyle;
  type: 'esriSMS';
  xoffset: number;
  yoffset: number;
}

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleFillSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSFS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isEsriSimpleFillSymbol = (verifyIfSymbol: EsriBaseSymbol): verifyIfSymbol is EsriSimpleFillSymbol => {
  return verifyIfSymbol.type === 'esriSFS';
};

export interface EsriSimpleFillSymbol extends EsriBaseSymbol {
  color: TypeEsriColor;
  outline: EsriSimpleLineSymbol;
  style: EsriFillStyle;
  type: 'esriSFS';
  width: number;
}

export type EsriFillStyle =
  | 'esriSFSBackwardDiagonal'
  | 'esriSFSCross'
  | 'esriSFSDiagonalCross'
  | 'esriSFSForwardDiagonal'
  | 'esriSFSHorizontal'
  | 'esriSFSNull'
  | 'esriSFSSolid'
  | 'esriSFSVertical';

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleLineSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSLS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isSimpleLineSymbol = (verifyIfSymbol: EsriBaseSymbol): verifyIfSymbol is EsriSimpleLineSymbol => {
  return verifyIfSymbol.type === 'esriSLS';
};

export interface EsriSimpleLineSymbol extends EsriBaseSymbol {
  color: TypeEsriColor;
  style: EsriLineStyle;
  type: 'esriSLS';
  width: number;
}

export type EsriLineStyle =
  | 'esriSLSDash'
  | 'esriSLSDashDot'
  | 'esriSLSDashDotDot'
  | 'esriSLSDot'
  | 'esriSLSLongDash'
  | 'esriSLSLongDashDot'
  | 'esriSLSNull'
  | 'esriSLSShortDash'
  | 'esriSLSShortDashDot'
  | 'esriSLSShortDashDotDot'
  | 'esriSLSShortDot'
  | 'esriSLSSolid';

export type EsriSymbolStyle = 'esriSMSCircle' | 'esriSMSCross' | 'esriSMSDiamond' | 'esriSMSSquare' | 'esriSMSTriangle' | 'esriSMSX';

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriPictureMarkerSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriPMS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isPictureMarkerSymbol = (verifyIfSymbol: EsriBaseSymbol): verifyIfSymbol is EsriPictureMarkerSymbol => {
  return verifyIfSymbol.type === 'esriPMS';
};

export interface EsriPictureMarkerSymbol extends EsriBaseSymbol {
  angle: number;
  contentType: string;
  height: number;
  imageData: string;
  type: 'esriPMS';
  width: number;
  xoffset: number;
  yoffset: number;
}

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriSimpleRenderer if the type attribute of the verifyIfRenderer
 * parameter is 'simple'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const esriRendererIsSimple = (verifyIfRenderer: EsriBaseRenderer): verifyIfRenderer is EsriSimpleRenderer => {
  return verifyIfRenderer.type === 'simple';
};

export interface EsriSimpleRenderer extends EsriBaseRenderer {
  type: 'simple';
  description: string;
  label: string;
  rotationExpression: string;
  rotationType: 'arithmetic' | 'geographic';
  symbol: EsriSymbol;
}

function convertLineStyle(lineStyle: EsriLineStyle): TypeLineStyle {
  switch (lineStyle) {
    case 'esriSLSDash':
      return 'dash';
    case 'esriSLSDashDot':
      return 'dash-dot';
    case 'esriSLSDashDotDot':
      return 'dash-dot-dot';
    case 'esriSLSDot':
      return 'dot';
    case 'esriSLSLongDash':
      return 'longDash';
    case 'esriSLSLongDashDot':
      return 'longDash-dot';
    case 'esriSLSNull':
      return 'null';
    case 'esriSLSShortDash':
      return 'shortDash';
    case 'esriSLSShortDashDot':
      return 'shortDash-dot';
    case 'esriSLSShortDashDotDot':
      return 'shortDash-dot-dot';
    case 'esriSLSSolid':
      return 'solid';
    default: {
      console.log(`Handling of ESRI renderer line style '${lineStyle}' is not coded, 'solid' will be used instead.`);
      return 'solid';
    }
  }
}

function convertFillStyle(fillStyle: EsriFillStyle): TypeFillStyle {
  switch (fillStyle) {
    case 'esriSFSBackwardDiagonal':
      return 'backwardDiagonal';
    case 'esriSFSCross':
      return 'cross';
    case 'esriSFSDiagonalCross':
      return 'diagonalCross';
    case 'esriSFSForwardDiagonal':
      return 'forwardDiagonal';
    case 'esriSFSHorizontal':
      return 'horizontal';
    case 'esriSFSNull':
      return 'solid';
    case 'esriSFSSolid':
      return 'solid';
    case 'esriSFSVertical':
      return 'vertical';
    default: {
      console.log(`Handling of ESRI renderer fill style '${fillStyle}' is not coded, 'solid' will be used instead.`);
      return 'solid';
    }
  }
}

function convertSymbolStyle(symbolStyle: EsriSymbolStyle): TypeSymbol {
  switch (symbolStyle) {
    case 'esriSMSCircle':
      return 'circle';
    case 'esriSMSCross':
      return '+';
    case 'esriSMSDiamond':
      return 'diamond';
    case 'esriSMSSquare':
      return 'square';
    case 'esriSMSTriangle':
      return 'triangle';
    case 'esriSMSX':
      return 'X';
    default: {
      console.log(`Handling of ESRI renderer symbol style '${symbolStyle}' is not coded, 'circle' will be used instead.`);
      return 'circle';
    }
  }
}

function convertEsriColor(color: TypeEsriColor): string {
  return asString([color[0], color[1], color[2], color[3] / 255]);
}

function convertSymbol(symbol: EsriSymbol): TypeKinfOfSymbolVectorSettings | undefined {
  if (symbol) {
    if (isSimpleMarkerSymbol(symbol)) {
      const offset: [number, number] = [
        symbol.xoffset !== undefined ? symbol.xoffset : 0,
        symbol.yoffset !== undefined ? symbol.yoffset : 0,
      ];
      const simpleSymbolVectorConfig: TypeSimpleSymbolVectorConfig = {
        type: 'simpleSymbol',
        rotation: symbol.angle !== undefined ? symbol.angle : 0,
        color: convertEsriColor(symbol.color),
        stroke: {
          color: convertEsriColor(symbol.outline.color),
          lineStyle: convertLineStyle(symbol.outline.style ? symbol.outline.style : 'esriSLSSolid'),
          width: symbol.outline.width,
        },
        size: symbol.size * 0.667,
        symbol: convertSymbolStyle(symbol.style),
        offset,
      };
      return simpleSymbolVectorConfig;
    }
    if (isSimpleLineSymbol(symbol)) {
      const lineSymbolVectorConfig: TypeLineStringVectorConfig = {
        type: 'lineString',
        stroke: {
          color: convertEsriColor(symbol.color),
          lineStyle: convertLineStyle(symbol.style ? symbol.style : 'esriSLSSolid'),
          width: symbol.width,
        },
      };
      return lineSymbolVectorConfig;
    }
    if (isEsriSimpleFillSymbol(symbol)) {
      const polygonVectorConfig: TypePolygonVectorConfig = {
        type: 'filledPolygon',
        color: convertEsriColor(symbol.color),
        stroke: {
          color: convertEsriColor(symbol.outline.color),
          lineStyle: convertLineStyle(symbol.outline.style ? symbol.outline.style : 'esriSLSSolid'),
          width: symbol.outline.width,
        },
        fillStyle: convertFillStyle(symbol.style),
      };
      return polygonVectorConfig;
    }
    if (isPictureMarkerSymbol(symbol)) {
      const offset: [number, number] = [
        symbol.xoffset !== undefined ? symbol.xoffset : 0,
        symbol.yoffset !== undefined ? symbol.yoffset : 0,
      ];
      const iconSymbolVectorConfig: TypeIconSymbolVectorConfig = {
        type: 'iconSymbol',
        mimeType: symbol.contentType,
        src: symbol.imageData,
        rotation: symbol.angle !== undefined ? symbol.angle : 0,
        opacity: 1,
        offset,
      };
      return iconSymbolVectorConfig;
    }
    console.log(`Handling of ESRI renderer symbol '${symbol}' is not coded, default GeoView settings will be used instead.`);
  }
  return undefined;
}

function getStyleConfigKey(settings: TypeKinfOfSymbolVectorSettings): TypeStyleConfigKey | undefined {
  if (isIconSymbolVectorConfig(settings) || isSimpleSymbolVectorConfig(settings)) return 'Point';
  if (isFilledPolygonVectorConfig(settings)) return 'Polygon';
  if (isLineStringVectorConfig(settings)) return 'LineString';
  return undefined;
}

function processUniqueValueRenderer(id: string, renderer: EsriUniqueValueRenderer): TypeStyleConfig | undefined {
  const style: TypeStyleConfig = {};
  const styleType = 'uniqueValue';
  const defaultLabel = renderer.defaultLabel === null ? undefined : renderer.defaultLabel;
  const defaultSettings = convertSymbol(renderer.defaultSymbol);
  const fields = [renderer.field1];
  if (renderer.field2) fields.push(renderer.field2);
  if (renderer.field3) fields.push(renderer.field3);
  const uniqueValueStyleInfo: TypeUniqueValueStyleInfo[] = [];
  renderer.uniqueValueInfos.forEach((symbolInfo) => {
    const settings = convertSymbol(symbolInfo.symbol);
    if (settings) {
      if (renderer.rotationType === 'geographic' && (isIconSymbolVectorConfig(settings) || isSimpleSymbolVectorConfig(settings)))
        settings.rotation = Math.PI / 2 - settings.rotation!;
      uniqueValueStyleInfo.push({
        label: symbolInfo.label,
        values: symbolInfo.value.split(renderer.fieldDelimiter),
        settings,
      });
    }
  });
  const styleConfigKey = getStyleConfigKey(uniqueValueStyleInfo[0].settings);
  const styleSettings: TypeUniqueValueStyleConfig = { id, styleType, defaultLabel, defaultSettings, fields, uniqueValueStyleInfo };
  if (styleConfigKey) {
    style[styleConfigKey] = styleSettings;
    return style;
  }
  return undefined;
}

function processSimpleRenderer(id: string, renderer: EsriSimpleRenderer): TypeStyleConfig | undefined {
  const style: TypeStyleConfig = {};
  const label = renderer.label ? renderer.label : id;
  const settings = convertSymbol(renderer.symbol);
  if (settings) {
    if (renderer.rotationType === 'geographic' && (isIconSymbolVectorConfig(settings) || isSimpleSymbolVectorConfig(settings)))
      settings.rotation = Math.PI / 2 - settings.rotation!;
    const styleConfigKey = getStyleConfigKey(settings);
    const styleSettings: TypeSimpleStyleConfig = { id, styleType: 'simple', label, settings };
    if (styleConfigKey) {
      style[styleConfigKey] = styleSettings;
      return style;
    }
  }
  return undefined;
}

function processClassBreakRenderer(id: string, EsriRenderer: EsriClassBreakRenderer): TypeStyleConfig | undefined {
  const style: TypeStyleConfig = {};
  const styleType = 'classBreaks';
  const defaultLabel = EsriRenderer.defaultLabel === null ? undefined : EsriRenderer.defaultLabel;
  const defaultSettings = convertSymbol(EsriRenderer.defaultSymbol);
  const { field } = EsriRenderer;
  const classBreakStyleInfos: TypeClassBreakStyleInfo[] = [];
  for (let i = 0; i < EsriRenderer.classBreakInfos.length; i++) {
    const settings = convertSymbol(EsriRenderer.classBreakInfos[i].symbol);
    if (settings) {
      if (EsriRenderer.rotationType === 'geographic' && (isIconSymbolVectorConfig(settings) || isSimpleSymbolVectorConfig(settings)))
        settings.rotation = Math.PI / 2 - settings.rotation!;
      const geoviewClassBreakInfo: TypeClassBreakStyleInfo = {
        label: EsriRenderer.classBreakInfos[i].label,
        minValue: EsriRenderer.classBreakInfos[i].classMinValue,
        maxValue: EsriRenderer.classBreakInfos[i].classMaxValue,
        settings,
      };
      classBreakStyleInfos.push(geoviewClassBreakInfo);
      if (EsriRenderer.classBreakInfos[i].classMinValue || EsriRenderer.classBreakInfos[i].classMinValue === 0)
        classBreakStyleInfos[i].minValue = EsriRenderer.classBreakInfos[i].classMinValue;
      else if (i === 0) classBreakStyleInfos[i].minValue = EsriRenderer.minValue;
      else classBreakStyleInfos[i].minValue = EsriRenderer.classBreakInfos[i - 1].classMaxValue;
    }
  }

  const styleConfigKey = getStyleConfigKey(classBreakStyleInfos[0].settings);
  const styleSettings: TypeClassBreakStyleConfig = { id, styleType, defaultLabel, defaultSettings, field, classBreakStyleInfos };
  if (styleConfigKey) {
    style[styleConfigKey] = styleSettings;
    return style;
  }
  return undefined;
}

/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriClassBreakRenderer if the type attribute of the
 * verifyIfRenderer parameter is 'classBreaks'. The type ascention applies only to the true block of the if clause that use this
 * function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const esriRendererIsClassBreaks = (verifyIfRenderer: EsriBaseRenderer): verifyIfRenderer is EsriClassBreakRenderer => {
  return verifyIfRenderer.type === 'classBreaks';
};

type EsriClassBreakInfoEntry = {
  classMaxValue: number;
  classMinValue: number | undefined | null;
  description: string;
  label: string;
  symbol: EsriSymbol;
};

export interface EsriClassBreakRenderer extends EsriBaseRenderer {
  type: 'classBreaks';
  classBreakInfos: EsriClassBreakInfoEntry[];
  defaultLabel: string;
  defaultSymbol: EsriSymbol;
  field: string;
  minValue: number;
  rotationExpression: string;
  rotationType: 'arithmetic' | 'geographic';
}

export function getStyleFromEsriRenderer(
  mapId: string,
  layerEntryConfig: TypeLayerEntryConfig,
  renderer: EsriBaseRenderer
): TypeStyleConfig | undefined {
  const id = `${mapId}-${layerEntryConfig.geoviewRootLayer?.layerId}-${layerEntryConfig.layerId}`;
  if (esriRendererIsUniqueValue(renderer)) return processUniqueValueRenderer(id, renderer);
  if (esriRendererIsSimple(renderer)) return processSimpleRenderer(id, renderer);
  if (esriRendererIsClassBreaks(renderer)) return processClassBreakRenderer(id, renderer);
  console.log(`Handling of ESRI renderer '${renderer.type}' is not coded, default GeoView settings will be used instead.`);
  return undefined;
}
