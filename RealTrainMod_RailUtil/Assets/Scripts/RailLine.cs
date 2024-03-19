using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RailLine : MonoBehaviour
{
    public LineRenderer lineRenderer;

    public LineRenderer lineStartRenderer;
    public LineRenderer lineEndRenderer;


    public Transform startPoint;
    public Transform endPoint;
    public Transform controlPoint1;
    public Transform controlPoint2;

    public int numPoints;
    public List<Vector3> points = new List<Vector3>();



    void Update()
    {
        lineStartRenderer.SetPosition(0, startPoint.position);
        lineStartRenderer.SetPosition(1, controlPoint1.position);

        lineEndRenderer.SetPosition(0, endPoint.position);
        lineEndRenderer.SetPosition(1, controlPoint2.position);


        DrawBezierCurve();
    }

    void DrawBezierCurve()
    {
        points.Clear();

        for (int i = 0; i <= numPoints; i++)
        {
            float t = i / (float)numPoints;
            Vector3 point = BezierCurveGenerator.Instance.CalculateBezierPoint(t, startPoint.position, controlPoint1.position, controlPoint2.position, endPoint.position);
            points.Add(point);
        }

        lineRenderer.positionCount = points.Count;
        lineRenderer.SetPositions(points.ToArray());
    }

    
}
