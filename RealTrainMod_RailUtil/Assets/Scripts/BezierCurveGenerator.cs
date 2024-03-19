using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BezierCurveGenerator : Singleton<BezierCurveGenerator>
{
    public List<RailLine> rails = new List<RailLine>();

    public Vector3 CalculateBezierPoint(float t, Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3)
    {
        float u = 1 - t;
        float tt = t * t;
        float uu = u * u;
        float uuu = uu * u;
        float ttt = tt * t;

        Vector3 p = uuu * p0; // 첫 번째 항
        p += 3 * uu * t * p1; // 두 번째 항
        p += 3 * u * tt * p2; // 세 번째 항
        p += ttt * p3; // 네 번째 항

        return p;
    }
}
