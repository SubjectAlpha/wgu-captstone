/*
    I used the Object Relationship Modeling (ORM) program Prisma for this project,
    which does not support inheritance. I do not believe that will satisfy the inheritance requirement,
    or the class diagram requirement, so I have written this C# class to replicate my database schema
    in a way that satisfies requirements.
*/

namespace WGUCapstone.Example;

public class BaseClass {
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }
    public string CreatedBy { get; set; }
    public string ModifiedBy { get; set; }
    public bool IsDeleted { get; set; }
}

public class User : BaseClass {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int Permission { get; set; }
}

public class Customer : BaseClass {
    public string Company { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
}

public class Permission : BaseClass {
    public string Name { get; set; }
    public int PowerLevel { get; set; }
}

public class SystemSettings : BaseClass {
    public string Name { get; set; }
    public string Value { get; set; }
    public bool Enabled { get; set; }
}
